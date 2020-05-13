"use strict";

// const server = require("../server");

module.exports = () => {
    require("../src/libs/dbManager").db.destroy();
};
