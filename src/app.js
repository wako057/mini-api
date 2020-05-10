"use strict";

const env = process.env.NODE_ENV || "production";
const app = require("express")();
const config = require("js-config");
const loggers = require("js-logger").init(config.logs);
const bodyParser = require("body-parser");
const errorHandler = require("./libs/errorHandler");
const routes = require("./routes/index");

app.set("env", env);
app.use(bodyParser.json()); // support json encoded bodies
app.use(loggers.morganMiddleware); // Middleware to create access.log styled logs
app.use(loggers.loggerMiddleware); // Middleware to add logger in request object
app.use("/v1", routes());
app.use(errorHandler); // Middleware to handle the errors


module.exports = app;
