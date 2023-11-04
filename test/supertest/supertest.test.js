import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing Ecommerse store", () => {
  describe("Testing Products Endpoints", () => {
    it("Should get all users", async () => {
      const response = await request.get("/api/products");
      console.log(response);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("array");
    });
    //   it("Should get one user", async () => {
    //     const response = await request.get("/api/users/1");
    //     expect(response.status).to.eql(200);
    //     expect(response.body).to.be.an("object");
    //   });
    //   it("Should create a new user", async () => {
    //     const response = await request.post("/api/users").send({
    //       first_name: "Test",
    //       last_name: "User",
    //       email: "testuser@gmail.com",
    //       password: "test123",
    //       carts: [],
    //       role: "admin",
    //     });
    //     expect(response.status).to.eql(200);
    //     expect(response.body).to.be.an("object");
    //   });
    //   it("Should update a user", async () => {
    //     const response = await request.put("/api/users/1").send({
    //       first_name: "Test",
    //       last_name: "User",
    //       email: "testuser@gmail.com",
    //       password: "test123",
    //       role: "admin",
    //     });
    //   });
    //   it("Should delete a user", async () => {
    //     const response = await request.delete("/api/users/1");
    //     expect(response.status).to.eql(200);
    //     expect(response.body).to.be.an("object");
    //   });
    // });
  });
});
