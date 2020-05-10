"use strict";

const childProcess = require("child_process");
const conf = require("js-config").databases;

const execConf = {
    env: {
        DB_HOST: conf.host,
        DB_USER: conf.user,
        DB_PORT: conf.port,
        PGPASSWORD: conf.password,
        DB_NAME: conf.database,
        PATH: process.env.PATH
    }
};

module.exports = () => {
    return childProcess.execFileSync(`${process.cwd()}/tests/db.up.sh`, execConf);
};
