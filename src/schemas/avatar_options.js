"use strict";

const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
        category: {
            required: true,
            type: ["string", "null"]
        },
        definition: {
            required: true,
            type: "object",
        }
    }
};

module.exports = schema;
