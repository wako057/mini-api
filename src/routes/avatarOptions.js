"use strict";

const router = require("express").Router();
const AvatarOptions = require("../repositories/avatar_options");
const ErrorNotFound = require("../libs/errorNotFound");
const ErrorValidation = require("../libs/errorValidation");

router.post("/", async (req, res, next) => {
    const avatarOptions = new AvatarOptions(req.logger);
    try {
        const createChk = await avatarOptions.create(req.body);
        return res.status(201).send(createChk);
    } catch (error) {
        next(error);
    };
});

router.get("/:uuid", async (req, res, next) => {
    const avatarOptions = new AvatarOptions(req.logger);
    try {
        const getChk = await avatarOptions.get(req.params.uuid);
        if (getChk.length === 0) {
            next(new ErrorNotFound("Avatar Option not found"));
        } else {
            return res.status(200).send(getChk);
        }

    } catch (error) {
        if (error.code === '22P02') {
            next(new ErrorValidation("Bad Format"));
        } else {
            next(error);
        }
    };
});

module.exports = router;
