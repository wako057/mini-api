"use strict";

const supertest = require("supertest");
const app = require("../../src/app");

describe("[FUNCTIONAL]: user routes", () => {
    let request;

    beforeAll(async done => {
        request = await supertest(app)
        return done();
    });

    describe("set", () => {

        it("create a user", (done) => {
            const randomStr = Math.random().toString(36).substring(2);
            const newUser = {
                email: `${randomStr}@wako057.net`,
                first_name: "Greg",
                last_name: "Gerard",
                civility: "Mr"
            };

            return request.post('/v1/users')
                .send(newUser)
                .expect(201)
                .then(res => {
                    const answer = res.body[0];
                    expect(answer).toHaveProperty("id");
                    expect(answer).toHaveProperty("civility");
                    expect(answer).toHaveProperty("first_name");
                    expect(answer).toHaveProperty("last_name");
                    expect(answer).toHaveProperty("email");

                    return done();
                });
        });

        it("get user", (done) => {
            const expectedResult = require("../data/get-user.json");

            return request.get('/v1/users?user_id=5fa405f7-4001-4c63-83d2-5df3225ffc8c')
                .expect(200)
                .then(res => {
                    expect(res.body).toMatchObject(expectedResult);
                    done();
                });
        });

        it("fail create a user (user exist)", (done) => {
            const randomStr = Math.random().toString(36).substring(2);
            const newUser = {
                email: `${randomStr}@wako057.net`,
                first_name: "Greg",
                last_name: "Gerard",
                civility: "Mr"
            };

            return request.post('/v1/users')
                .send(newUser)
                .expect(201)
                .then(res => {
                    const answer = res.body[0];

                    expect(answer).toHaveProperty("id");
                    expect(answer).toHaveProperty("civility");
                    expect(answer).toHaveProperty("first_name");
                    expect(answer).toHaveProperty("last_name");
                    expect(answer).toHaveProperty("email");

                    return request.post('/v1/users')
                        .send(newUser)
                        .expect(403)
                        .then(() => {
                            return done();
                        })
                });
        });

        it("fail create a user (bad params)", () => {
            const newUser = {
                first_name: "Greg",
                civility: "Mr"
            };

            return request.post('/v1/users')
                .send(newUser)
                .expect(400);
        });
        //
        // it("patch user's first_name", () => {
        //     return request.put('/v1/users?user_id=a4724a50-a7c8-4dcd-936f-a557162279fe')
        //         .send({ firstname: "bill" })
        //         .expect(200)
        //         .then(res => {
        //         });
        // });
        //
        // it("delete user", () => {
        //     return request.delete('/v1/users?user_id=a4724a50-a7c8-4dcd-936f-a557162279fe')
        //         .send({ firstname: "bill" })
        //         .expect(200)
        //         .then(res => {
        //         });
        // });

    });

    afterAll(async (done) => {
        done();
    });
});
