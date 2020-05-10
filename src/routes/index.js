"use strict";

const router = require("express").Router();
const statusRoute = require("./status");
const usersRoute = require("./users");

const init = () => {
    router.use("/status", statusRoute);
    router.use("/users", usersRoute);

    return router;
};

module.exports = init;
