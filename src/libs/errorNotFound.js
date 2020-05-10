"use strict";

class ErrorNotFound extends Error {
    constructor (message) {
        super();
        this.name = "NotFound";
        this.message = message;
    }
}

module.exports = ErrorNotFound;
