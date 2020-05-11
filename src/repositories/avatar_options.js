"use strict";

const db = require("../libs/dbManager").db;
const Repository = require("./repository");
const schema = require("../schemas/avatar_options");
const ErrorValidation = require("../libs/errorValidation");

class AvatarOptions extends Repository {
    constructor (logger) {
        super(logger, "avatar_options", schema);
    }

    async create (userObj) {
        const payload = {...userObj};
        const isValid = this.validator.isJsonSchemaValid(payload, this.schema);
        if (isValid) {
            try {
                const resWrite = await db("avatar_options").insert(payload, "*");
                return resWrite;

            } catch (e) {
                    throw new Error("Undefined");
            }
        } else {
            throw new ErrorValidation("bad data received");
        }
    }

    list (filter, offset, limit) {
    }

}

module.exports = AvatarOptions;
