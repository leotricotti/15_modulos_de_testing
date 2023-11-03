import mongoose from "mongoose";
import Carts from "../src/dao/classes/carts.dao.js";
import Products from "../src/dao/classes/products.dao.js";
import Assert from "assert";
import config from "../src/config/config.js";

const MONGO_URL = config.mongo.URL;
const assert = Assert.strict;
const TEST_TIMEOUT = 15000;
const cid = "65402d55da7abee203738dd2";
const pid = "60b1f2d0d1b2b9c4b4f1e3c4";
const cart = {
  products: [
    {
      product: pid,
      quantity: 1,
    },
  ],
};
const emptyCart = {
  products: [],
};

mongoose.connect(MONGO_URL).then(() => {
  console.log("Conectado a la base de datos");
});

async function getUpdatedCart(cartsDao, cid) {
  const updatedCart = await cartsDao.getOne(cid);
  return updatedCart;
}

describe("Testing Carts Dao", () => {
  beforeEach(function () {
    this.cartsDao = new Carts();
    this.productsDao = new Products();
  });

  it("Should get all carts", async function () {
    this.timeout(TEST_TIMEOUT);
    const result = await this.cartsDao.getAll();
    assert.equal(Array.isArray(result), true, "Result should be an array");
    assert.equal(
      result.length > 0,
      true,
      "Result should have at least one element"
    );
  });

  it("Should get one cart", async function () {
    this.timeout(TEST_TIMEOUT);
    const result = await this.cartsDao.getOne(cid);
    assert.equal(
      result._id.toString(),
      cid.toString(),
      "Result should be equal to cid"
    );
  });

  it("Should create a cart", async function () {
    this.timeout(TEST_TIMEOUT);

    const result = await this.cartsDao.saveCart(emptyCart);

    assert.equal(
      Array.isArray(result.products),
      true,
      "Result should be an array"
    );
  });

  it("Should add a product to a cart", async function () {
    this.timeout(TEST_TIMEOUT);
    const result = await this.cartsDao.updateCart(cid, cart);

    const updatedCart = await getUpdatedCart(this.cartsDao, cid);

    assert.equal(
      updatedCart.products[0].product.toString() === pid.toString(),
      true,
      "Result should be equal to pid"
    );
  });

  it("Should empty cart", async function () {
    this.timeout(TEST_TIMEOUT);

    const result = await this.cartsDao.emptyCart(cid, emptyCart);

    const updatedCart = await getUpdatedCart(this.cartsDao, cid);

    assert.equal(
      updatedCart.products.length === 0,
      true,
      "Result should be equal to emptyCart"
    );
  });
});
