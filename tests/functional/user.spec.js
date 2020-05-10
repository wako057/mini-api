"use strict";

const knex = require("../../src/libs/dbManager").dbWrite;
const supertest = require("supertest");
const app = require("../../src/server");
const uuid = require("uuid").v1;
const config = require("cpm-config");
const resultSets = require("../data/user");
const nock = require("nock");

const randomUuid = uuid();

describe("[FUNCTIONAL]: user routes", () => {

    beforeAll(done => {
    });

    describe("set", () => {

        it("create a user", () => {
            return request.post('/v1/users')
                .send({ email: "ab@c.d", password: "youpla", first_name: "John", last_name: "Doe", civility: "M." })
                .expect(201)
                .then(res => {
                    expect(res.body).toMatchObject(resultSets.newUser);
                });
        });

        it("get user", () => {
            return request.get('/v1/users?user_id=a4724a50-a7c8-4dcd-936f-a557162279fe')
                .send({ firstname: "bill" })
                .expect(200)
                .then(res => {
                });
        });

        it("fail create a user (user exist)", () => {
            return request.post('/v1/users')
                .send({ email: "ab@c.d", password: "youplaboom" })
                .expect(409);
        });

        it("fail create a user (bad params)", () => {
            return request.post('/v1/users')
                .set({ "x-cpm-api-key": config.api_keys[0] })
                .send({ email: "abc.d", password: "youplaboom" })
                .expect(400);
        });

        it("patch user's first_name", () => {
            return request.put('/v1/users?user_id=a4724a50-a7c8-4dcd-936f-a557162279fe')
                .send({ firstname: "bill" })
                .expect(200)
                .then(res => {
                });
        });

        it("delete user", () => {
            return request.delete('/v1/users?user_id=a4724a50-a7c8-4dcd-936f-a557162279fe')
                .send({ firstname: "bill" })
                .expect(200)
                .then(res => {
                });
        });

    });

    afterAll(() => {
        app.close();
    });
});
