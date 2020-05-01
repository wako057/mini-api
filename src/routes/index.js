"use strict";

const router = require("express").Router();
const statusRoute = require("./status");

const init = () => {
    router.use("/status", statusRoute);

    return router;
};

module.exports = init;
