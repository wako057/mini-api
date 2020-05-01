"use strict";

const process = require("process");

module.exports = (() => {
    switch (process.env.NODE_ENV) {
        case "test":
            return require("../config-test.json");
        default:
            return require("../config.json");
    }
})();
