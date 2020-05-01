/* eslint-disable complexity */
"use strict";

module.exports = (err, req, res, next) => {
    req.logger.error(JSON.stringify(err));
    req.logger.debug("Error: [", err.name, "] - Message: [", err.message, "] - Stack Trace: ", err.stack);

    switch (err.name) {
        case "ValidationError":
            res.status(400).send(err.message);
            break;
        case "NotFound":
            res.status(404).send(err.message);
            break;
        case "EntityTooLarge":
            res.status(413).send(err.message);
            break;
        case "UnAuthorized":
            res.status(401).send(err.message);
            break;
        case "Wakoserror":
            res.status(499).send(err.message);
            break;
        case "NotImplemented":
            res.status(501).send(err.message);
            break;
        default:
            res.status(500).send({ error: "server unhandled error" });
    }
};
