"use strict";

class ErrorAlreadyExist extends Error {
    constructor (message) {
        super();
        this.name = "AlreadyExist";
        this.message = message;
    }
}

module.exports = ErrorAlreadyExist;
