"use strict";

const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
        user_id: {
            required: true,
            type: ["string", "null"]
        },
        description: {
            required: true,
            type: "array",
        }
    }
};

module.exports = schema;
