"use strict";

const supertest = require("supertest");
const app = require("../../src/app");

describe.only("[FUNCTIONAL]: profile routes", () => {
    let request;

    beforeAll(async done => {
        request = await supertest(app)
        return done();
    });

    describe("set", () => {

        it.only("create a avatar", (done) => {
            const avatar = [
                { id: '3d916ffb-0f36-4faf-acc3-4d24defbac2c', category: 'clothes', definition: { size: '42', type: 'hat', color: '#424242' } },
                { id: 'b16613ba-291c-486a-b58f-06bfe9586a57', category: 'hair', definition: { color: '#f4d3a2', length: 'medium' } },
                { id: 'a6e69166-30bc-43f3-9cf8-9f30d97a9cd8', category: 'skin', definition: { color: '#000' } }
                ];
            const userId = '227409de-4d81-47c9-a6ff-e06d7dc9a567';

            return request.post(`/v1/avatar/${userId}`)
                .send(avatar)
                .expect(201)
                .then(res => {
                    const answer = res.body[0];
                    expect(answer).toHaveProperty("id");
                    expect(answer).toHaveProperty("user_id");
                    expect(answer).toHaveProperty("description");

                    return done();
                });
        });

        it.only("get a avatar", (done) => {
            const expectedResult = require("../data/get-avatar.json");
            return request.get('/v1/avatar/385e7678-9c1e-470a-a520-03cf12edfb54')
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
