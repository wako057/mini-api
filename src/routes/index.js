"use strict";

const router = require("express").Router();
const statusRoute = require("./status");
const usersRoute = require("./users");
const avatarOptionsRoute = require("./avatarOptions");

const init = () => {
    router.use("/status", statusRoute);
    router.use("/users", usersRoute);
    router.use("/avatarOptions", avatarOptionsRoute);

    return router;
};

module.exports = init;
