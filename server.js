"use strict";

const port = process.env.PORT || 8080;
const config = require("./src/libs/config");
const loggers = require("./src/libs/logger").init(config.logs);
const app = require("./src/app")(config, loggers);

const server = app.getApp().listen(port, () => {
    loggers.logger.info(`
Process ${process.pid} is listening to all incoming requests on port ${port},
workerProcess: ${process.pid}`);
});


module.exports = server;
