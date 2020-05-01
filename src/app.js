"use strict";

const app = require("express")();
const http = require("http").Server(app);
const errorHandler = require("./errorHandler");

const routes = require("./routes/index");

class App {
    constructor (config, loggers) {
        this.config = config;
        this.loggers = loggers;
    }

    getApp () {
        app.use(this.loggers.morganMiddleware); // Middleware to create access.log styled logs
        app.use(this.loggers.loggerMiddleware); // Middleware to add logger in request object
        app.use("/v1", routes());
        app.use(errorHandler); // Middleware to handle the errors

        return http;
    }
}

module.exports = (config, loggers) => new App(config, loggers);
