"use strict";

const supertest = require("supertest");
const app = require("../../src/app");

describe("[FUNCTIONAL]: profile routes", () => {
    let request;

    beforeAll(async done => {
        request = await supertest(app)
        return done();
    });

    describe("set", () => {

        it.only("create a avataroptions", (done) => {
            const avatarOptions = {
                category: 'clothes',
                definition: {
                    type: "hat",
                    color: "#5b352c",
                    size: "24"
                }
            };

            return request.post('/v1/avatarOptions')
                .send(avatarOptions)
                .expect(201)
                .then(res => {
                    const answer = res.body[0];
                    expect(answer).toHaveProperty("id");
                    expect(answer).toHaveProperty("category");
                    expect(answer).toHaveProperty("definition");

                    return done();
                });
        });


        it.only("get a avataroptions", (done) => {
            const expectedResult = require("../data/get-avatar-option.json");
            return request.get('/v1/avatarOptions/fabb59b6-dff9-419c-9e1d-cad047eda6a2')
                .expect(200)
                .then(res => {
                    expect(res.body).toMatchObject(expectedResult);
                    return done();
                });
        });

    });

    afterAll(async (done) => {
        done();
    });
});
