"use strict";

const db = require("../libs/dbManager").db;
const Repository = require("./repository");
const schema = require("../schemas/avatar");
const ErrorValidation = require("../libs/errorValidation");

class AvatarOptions extends Repository {
    constructor (logger) {
        super(logger, "avatar", schema);
    }

    async create (userId, userObj) {
        const payload = { user_id: userId, description: [...userObj] };
        const isValid = this.validator.isJsonSchemaValid(payload, this.schema);
        if (isValid) {
            try {
                payload.description = JSON.stringify(payload.description);
                const resWrite = await db("avatar").insert(payload, "*");
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
