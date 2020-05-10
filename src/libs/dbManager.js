"use strict";

const config = require("./config");
const loggers = require("./logger").init(config.logs);
const types = require("pg").types;
const Moment = require("moment");
const INT8_OID = 20;
const INT8_ARRAY_OID = 1016;
const PURE_DATE_OID = 1082;

const knexConf = {
    client: config.databases.protocol,
    connection: {
        host: config.databases.host,
        user: config.databases.user,
        password: config.databases.password,
        database: config.databases.database,
        port: config.databases.port
    }
};

types.setTypeParser(INT8_OID, val => {
    return val === null ? null : parseInt(val);
});

types.setTypeParser(INT8_ARRAY_OID, val => {
    return types.arrayParser.create(val, parseInt).parse();
});

types.setTypeParser(PURE_DATE_OID, val => {
    return val === null ? null : Moment(val).format("YYYY-MM-DD");
});


knexRead.on("query", query => {
    loggers.logger.debug("", query.sql, query.bindings);
});

const knex = require("knex")(knexConf);

exports.db = knex;

exports.destroy = () => {
    knex.destroy();
};
