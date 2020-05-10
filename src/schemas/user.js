"use strict";

const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
        civility: {
            required: true,
            type: ["string"],
            enum: ["Mme", "Mr"]
        },
        first_name: {
            required: true,
            type: ["string", "null"]
        },
        last_name: {
            required: true,
            type: ["string", "null"]
        },
        email: {
            required: true,
            type: "string",
            pattern: /^.+@.+/
        },
        forgotten_password_code: {
            required: false,
            type: ["string", "null"]
        }
    }
};

module.exports = schema;
