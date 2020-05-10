"use strict";

const supertest = require("supertest");
const server = require("../../server");

describe("[FUNCTIONAL]: status routes", () => {

    let request;

    beforeAll(async done => {
        request = await supertest(server)
        return done();
    });

    it("get status", () => {
        return request.get('/v1/status')
            .expect(200)
            .then(res => {
                expect(res.body).toEqual({ status: "OK" });
                return Promise.resolve(true);
            });
    });

    afterAll(() => {
        app.close();
    });
});
