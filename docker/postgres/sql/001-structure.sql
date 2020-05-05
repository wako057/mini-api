
--- extension creation
create domain email as extensions.citext
    constraint email_check check ((VALUE)::text ~* '^[a-z0-9!#$%&''*+/=$1^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$'::text);

create extension "uuid-ossp"
    schema extensions
    version '1.1';
comment on extension "uuid-ossp" is 'generate universally unique identifiers (UUIDs)';

--- trigger definition
create or replace function update_modified_column() returns trigger
    language plpgsql
as $$
BEGIN
    NEW.updated = NOW();
    RETURN NEW;
END;
$$;

--- tables creation
create table "users"
(
    id uuid default extensions.uuid_generate_v4() not null
        constraint users_pkey
        primary key,
    name text,
    last_name text,
    email email,
    created timestamp with time zone default now() not null,
    updated timestamp with time zone
);

create table avatar_options
(
    id uuid default extensions.uuid_generate_v4() not null
        constraint avatar_options_pk
        primary key,
    category text not null,
    definition jsonb default '{}'::jsonb not null
);

create table avatar
(
    id uuid default extensions.uuid_generate_v4() not null
        constraint avatar_pk
        primary key,
    user_id uuid not null
        constraint avatar_users_id_fk
        references users,
    description jsonb not null
);


create type order_status_enum as enum('init', 'order_sent', 'building', 'built', 'sending');

create table orders
(
    id serial
        constraint orders_pk
        primary key,
    user_id uuid not null
        constraint orders_users_id_fk
        references users,
    avatar_id uuid not null
        constraint orders_avatar_id_fk
        references avatar,
    status order_status_enum default 'init' not null,
    created timestamp with time zone default now() not null,
    updated timestamp with time zone
);


-- trigger creation
create trigger update_users_modtime
    before update
    on users
    for each row
execute procedure update_modified_column();

create trigger update_users_modtime
    before update
    on orders
    for each row
execute procedure update_modified_column();



