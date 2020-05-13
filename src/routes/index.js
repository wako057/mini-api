"use strict";

const router = require("express").Router();
const statusRoute = require("./status");
const usersRoute = require("./users");
const avatarOptionsRoute = require("./avatarOptions");
const avatarRoute = require("./avatar");

const init = () => {
    router.use("/status", statusRoute);
    router.use("/users", usersRoute);
    router.use("/avatarOptions", avatarOptionsRoute);
    router.use("/avatar", avatarRoute);

    return router;
};

module.exports = init;
