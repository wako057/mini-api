"use strict";

const db = require("../libs/dbManager").db;
const Repository = require("./repository");
const schema = require("../schemas/user");
const ErrorAlreadyExist = require("../libs/errorAlreadyExist");
const ErrorValidation = require("../libs/errorValidation");
const LOWER_EMAIL_FIELD = "lower(email) = ?";

class User extends Repository {
    constructor (logger) {
        super(logger, "users", schema);
    }

    getUser (id) {

    }

    async create (userObj) {
        const payload = {...userObj};


        const isValid = this.validator.isJsonSchemaValid(payload, this.schema);
        if (isValid) {
            try {
                payload.email = payload.email.toLowerCase();
                const resWrite = await db("users").insert(payload, "*");
                return resWrite;

            } catch (e) {

                if (e.code === "23505") {
                    throw new ErrorAlreadyExist("User Email already filled");
                } else {
                    throw new Error("Undefined");
                }
            }
        } else {
            throw new ErrorValidation("bad data received");
        }
    }

    list (filter, offset, limit) {
    }

}

module.exports = User;
