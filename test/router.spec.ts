import "mocha";
import * as chai from "chai";
import { agent } from "supertest";
import app from "../src/app";

const server = app.listen();
const request = agent(server);
const expect = chai.expect;

describe("Routes", () => {
    after(function () {
        server.close();
    });
    it("hello world", async () => {
        const response = await request.get("/");
        expect(response.status).to.eq(200);
        expect(response.text).to.eq("hello bitch!!");
    });
});
