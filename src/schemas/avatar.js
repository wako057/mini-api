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
            properties: {
                type: "object",
                additionalProperties: false,
                properties: {
                    id: {
                        required: true,
                        type: "string"
                    },
                    category: {
                        required: true,
                        type: "integer"
                    },
                    definition: {
                        required: true,
                        type: "object"
                    }
                }
            }
        }
    }
};

module.exports = schema;
