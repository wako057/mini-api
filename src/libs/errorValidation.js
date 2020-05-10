"use strict";

class ErrorValidation extends Error {
    constructor (message) {
        super();
        this.name = "ValidationError";
        this.message = message;
    }
}

module.exports = ErrorValidation;
