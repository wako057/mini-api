"use strict";

const router = require("express").Router();
const User = require("../repositories/user");
const ErrorNotFound = require("../libs/errorNotFound");
const ErrorValidation = require("../libs/errorValidation");

router.post("/", async (req, res, next) => {

    const userRepository = new User(req.logger);

    try {
        const createChk = await userRepository.create(req.body);
        return res.status(201).send(createChk);
    } catch (error) {
        next(error);
    };
});

router.get("/", async (req, res, next) => {
    const userRepository = new User(req.logger);

    try {
        const getChk = await userRepository.get(req.query.user_id);
        if (getChk.length === 0) {
            next(new ErrorNotFound("User not found"));
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
