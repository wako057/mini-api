"use strict";

const db = require("../libs/dbManager").db;
const validator = require("js-schema-validator");


class Repository {
    constructor (logger, table, schema) {
        this.logger = logger;
        this.validator = new validator(this.logger);
        this.table = table;
        this.schema = schema;
    }

    get (id) {
        const filter = { id };
        return db.select().from(this.table).where(filter);
    }

    list (filter, offset, limit) {
        return db.select().from(this.table).where(() => {});

    }

    create (data) {
        return this.validator.isJsonSchemaValid(data, this.schema)
            .then(() => {
                return db.insert(data, "*").into(this.table);
            });
    }

    update (filter, data) {
    }

    delete (filter) {
    }
}

module.exports = Repository;
