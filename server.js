"use strict";

const port = process.env.NODE_PORT || 4242;
const config = require("js-config");
const loggers = require("js-logger").init(config.logs);
const app = require("./src/app");

const server = app.listen(port, () => {
    loggers.logger.info(`
Process ${process.pid} is listening to all incoming requests on port ${port},
workerProcess: ${process.pid}`);
});

module.exports = server;
