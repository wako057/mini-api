"use strict";

const knex = require("../../src/libs/dbManager").dbWrite;
const supertest = require("supertest");
const app = require("../../src/server");

describe("[FUNCTIONAL]: status routes", () => {

    let request;

    beforeAll(done => {
        request = supertest(app)
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
