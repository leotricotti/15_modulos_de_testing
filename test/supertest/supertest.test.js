import chai from "chai";
import config from "../../src/config/config.js";
import supertest from "supertest";

// Configuración de Chai y Supertest
const expect = chai.expect;
const request = supertest("http://localhost:8080");

// Variables globales
let pid = "";
let cid = "";
let productQuantity = 0;
let adminToken = "";
let userToken = "";
const randomCode = Math.floor(Math.random() * 100000);
const randomAmount = Math.floor(Math.random() * 100000);
const randomEmail = `testuser${randomCode}@gmail.com`;
const adminUsername = config.admin.EMAIL;
const adminPassword = config.admin.PASSWORD;
const username = "tricottileo@gmail.com";
const userPassword = "12345";

// Objetos de prueba
const testProduct = {
  title: "Test product",
  description: "Test description",
  code: randomCode.toString(),
  price: 100,
  stock: 10,
  category: "Test category",
  thumbnail: [
    {
      img1: "https://freezedepot.com/wp-content/uploads/2023/05/producto-sin-imagen.png",
    },
  ],
};

const updatedProduct = {
  title: "Test product modified",
  description: "Test description modified",
  price: 100,
  code: randomCode.toString(),
  stock: 10,
  category: "Test category modified",
  thumbnail: [
    {
      img1: "https://freezedepot.com/wp-content/uploads/2023/05/producto-sin-imagen.png",
    },
  ],
};

// Inicio de los tests
describe("Testing Ecommerse Store", () => {
  // Test Products endpoints
  describe("Testing Products Endpoints", () => {
    before(async function () {
      const response = await request.post("/api/sessions/login").send({
        username: username,
        password: userPassword,
      });
      userToken = response.body.token;
    });

    // it("Should get all products", async () => {
    //   const response = await request
    //     .get("/api/products")
    //     .set("Authorization", `Bearer ${userToken}`);
    //   pid = response.body.products[0]._id;
    //   expect(response.status).to.eql(200);
    //   expect(response.body.message).to.equal("Productos obtenidos con éxito");
    //   expect(response.body.products[0]).to.have.property("_id");
    //   expect(response.body.products[0]).to.have.property("title");
    //   expect(response.body.products[0]).to.have.property("price");
    //   expect(response.body.products[0]).to.have.property("description");
    //   expect(response.body.products[0]).to.not.have.property("image");
    // });

    //   it("Should get one product", async () => {
    //     const response = await request
    //       .get(`/api/products/${pid}`)
    //       .set("Authorization", `Bearer ${userToken}`);
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Producto obtenido con éxito");
    //     expect(response.body.product).to.have.property("_id");
    //     expect(response.body.product).to.have.property("title");
    //     expect(response.body.product).to.have.property("price");
    //     expect(response.body.product).to.have.property("description");
    //     expect(response.body.product).to.not.have.property("image");
    //   });
    // });

    // // Test Real Time Products endpoints
    // describe("Testing Real Time Products Endpoints", () => {
    //   before(async function () {
    //     const response = await request.post("/api/sessions/login").send({
    //       username: adminUsername,
    //       password: adminPassword,
    //     });
    //     adminToken = response.body.token;
    //   });
    //   it("Should create a product", async () => {
    //     const response = await request
    //       .post("/api/realtimeproducts")
    //       .set("Authorization", `Bearer ${adminToken}`)
    //       .send(testProduct);
    //     pid = response.body.data._id;
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Producto creado con éxito");
    //     expect(response.body.data).to.have.property("_id");
    //     expect(response.body.data).to.have.property("title");
    //     expect(response.body.data).to.have.property("price");
    //     expect(response.body.data).to.have.property("description");
    //     expect(response.body.data).to.not.have.property("image");
    //   });

    //   it("Should update a product", async () => {
    //     const response = await request
    //       .put(`/api/realtimeproducts/${pid}`)
    //       .set("Authorization", `Bearer ${adminToken}`)
    //       .send(updatedProduct);
    //     expect(response.status).to.eql(200);
    //     expect(response.body.data).to.have.property("_id");
    //     expect(response.body.data.title).to.equal("Test product modified");
    //     expect(response.body.data).to.have.property("price");
    //     expect(response.body.data.description).to.equal(
    //       "Test description modified"
    //     );
    //     expect(response.body.data).to.not.have.property("image");
    //   });

    //   it("Should delete a product", async () => {
    //     const response = await request
    //       .delete(`/api/realtimeproducts/${pid}`)
    //       .set("Authorization", `Bearer ${adminToken}`);
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Producto eliminado con éxito");
    //     expect(response.body.data).to.have.property("_id");
    //     expect(response.body.data.title).to.equal("Test product modified");
    //     expect(response.body.data).to.have.property("price");
    //     expect(response.body.data.description).to.equal(
    //       "Test description modified"
    //     );
    //     expect(response.body.data).to.not.have.property("image");
    //   });
    // });

    // Test carts endpoints
    // describe("Testing Carts Endpoints", () => {
    //   before(async function () {
    //     const response = await request.post("/api/sessions/login").send({
    //       username: username,
    //       password: userPassword,
    //     });
    //     userToken = response.body.token;
    //   });

    // it("Should get all carts", async () => {
    //   const response = await request
    //     .get("/api/carts")
    //     .set("Authorization", `Bearer ${userToken}`);
    //   cid = response.body.data[0]._id;
    //   expect(response.status).to.eql(200);
    //   expect(response.body.message).to.equal("Carritos cargados con éxito");
    //   expect(response.body.data[0]).to.have.property("_id");
    //   expect(response.body.data[0]).to.have.property("products");
    // });

    // it("Should get one cart", async () => {
    //   const response = await request
    //     .get(`/api/carts/${cid}`)
    //     .set("Authorization", `Bearer ${userToken}`);
    //   expect(response.status).to.eql(200);
    //   expect(response.body.message).to.equal("Carrito obtenido con éxito");
    //   expect(response.body.data).to.have.property("_id");
    //   expect(response.body.data).to.have.property("products");
    // });

    //   it("Should create a cart", async () => {
    //     const response = await request
    //       .post("/api/carts")
    //       .set("Authorization", `Bearer ${userToken}`);
    //     cid = response.body.data._id;
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Carrito creado con éxito");
    //     expect(response.body.data).to.have.property("_id");
    //     expect(response.body.data).to.have.property("products");
    //     expect(response.body.data.products).to.eql([]);
    //   });

    //   it("Should add a product to the cart", async () => {
    //     const response = await request
    //       .post(`/api/carts/${cid}/product/${pid}`)
    //       .set("Authorization", `Bearer ${userToken}`)
    //       .send({ op: "add" });
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Carrito actualizado con éxito");
    //     expect(
    //       response.body.data.products.some((product) => product.product === pid)
    //     ).to.be.true;
    //     expect(response.body.data.products[0].quantity).to.equal(1);
    //   });

    //   it("Should increase product quantity", async () => {
    //     const response = await request
    //       .post(`/api/carts/${cid}/product/${pid}`)
    //       .set("Authorization", `Bearer ${userToken}`)
    //       .send({ op: "add" });
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Carrito actualizado con éxito");
    //     expect(
    //       response.body.data.products.some((product) => product.product === pid)
    //     ).to.be.true;
    //     expect(response.body.data.products[0].quantity).to.equal(2);
    //   });

    //   it("Should reduce product quantity", async () => {
    //     const response = await request
    //       .post(`/api/carts/${cid}/product/${pid}`)
    //       .set("Authorization", `Bearer ${userToken}`)
    //       .send({ op: "substract" });
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Carrito actualizado con éxito");
    //     expect(
    //       response.body.data.products.some((product) => product.product === pid)
    //     ).to.be.true;
    //     expect(response.body.data.products[0].quantity).to.equal(1);
    //   });

    //   it("Should delete a product from the cart", async () => {
    //     const response = await request
    //       .delete(`/api/carts/${cid}/product/${pid}`)
    //       .set("Authorization", `Bearer ${userToken}`);
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Producto eliminado con éxito");
    //     expect(
    //       response.body.data.products.some((product) => product.product === pid)
    //     ).to.be.false;
    //   });

    //   it("Should empty a cart", async () => {
    //     const response = await request
    //       .delete(`/api/carts/${cid}`)
    //       .set("Authorization", `Bearer ${userToken}`);
    //     expect(response.status).to.eql(200);
    //     expect(response.body.message).to.equal("Carrito vaciado con éxito");
    //     expect(response.body.data.products).to.eql([]);
    //   });
    // });

    // Test session endpoints
    describe("Testing Sessions Endpoints", () => {
      it("Should create a user", async () => {
        const response = await request.post("/api/sessions/signup").send({
          first_name: "Test",
          last_name: "User",
          email: randomEmail,
          password: randomCode.toString(),
        });
        console.log(response.body);
        expect(response.status).to.eql(200);
        expect(response.body.message).to.equal("Usuario creado con éxito");
        expect(response.body.data).to.have.property("_id");
        expect(response.body.data.first_name).equal("Test");
        expect(response.body.data.last_name).equal("User");
        expect(response.body.data.email).equal(randomEmail);
        expect(response.body.data).to.not.have.property("image");
      });

      it("Should login a user", async () => {
        const response = await request.post("/api/sessions/login").send({
          username: randomEmail,
          password: randomCode.toString(),
        });
        userToken = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.equal("Login realizado con éxito");
        expect(response.body).to.have.property("token");
        expect(response.body.token).to.not.be.empty;
        expect(response.body.token).to.be.a("string");
        expect(response.body).to.not.have.property("user");
      });

      it("Should get current user", async () => {
        const response = await request
          .get("/api/sessions/current")
          .set("Authorization", `Bearer ${userToken}`);
        console.log(response.body);
        expect(response.status).to.eql(200);
        expect(response.body.data.first_name).equal("Test");
        expect(response.body.data.username).equal(randomEmail);
        expect(response.body.data).to.not.have.property("image");
      });

      it('Should update user password', async () => {
        const response = await request
          .put("/api/sessions/updatePassword")
          .set("Authorization", `Bearer ${userToken}`)
          .send({
            currentPassword: randomCode.toString(),
            newPassword: randomAmount.toString(),
          });
        expect(response.status).to.eql(200);
        expect(response.body.message).to.equal("Contraseña actualizada con éxito");
      }
    });
  });
});
