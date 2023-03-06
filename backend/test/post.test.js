import request from "supertest";
import server from "../index.js";

describe("Test the get methods", () => {
    test("Test 1 - Post Get by ID Get Method", async () => {
        const response = await request(server).get(
          "/posts/63d2de1b8dc4ee1b3a7f0fc2"
        );
        expect(response.status).toBe(200);
      });
      test("Test 2 - Post Get by Creator Get Method", async () => {
        const response = await request(server).get(
          "/posts/63d2de1b8dc4ee1b3a7f0fc2"
        );
        expect(response.statusCode).toBe(200);
      });
      test("Test 2 - Post Get by Creator Get Method", async () => {
        const response = await request(server).get(
          "/posts/63d2de1b8dc4ee1b3a7f0fc2"
        );
        expect(response.statusCode).toBe(200);
      });
})