import mongoose from "mongoose";
import User from "../../src/dao/classes/users.dao.js";
import Carts from "../../src/dao/classes/carts.dao.js";
import Assert from "assert";
import config from "../../src/config/config.js";

const MONGO_URL = config.mongo.URL;
const assert = Assert.strict;
const TEST_TIMEOUT = 15000;
const TEST_USER_ID = "653fa76767af997eef4c72d2";
const TEST_USERNAME = "tricottileo@gmail.com";

mongoose.connect(MONGO_URL).then(() => {
  console.log("Conectado a la base de datos");
});

async function getUpdatedUser(usersDao, username) {
  const updatedUser = await usersDao.getOne(username);
  return updatedUser[0];
}

describe("Testing Users Dao", () => {
  beforeEach(function () {
    this.usersDao = new User();
    this.cartsDao = new Carts();
  });

  it("Should get one user", async function () {
    this.timeout(TEST_TIMEOUT);
    const result = await this.usersDao.getOne(TEST_USERNAME);
    assert.equal(result[0].first_name, "Leonardo");
  });

  it("Should create user", async function () {
    this.timeout(TEST_TIMEOUT);
    const user = {
      first_name: "Leonardo",
      last_name: "Tricotti",
      email: "leotricotti@gmail.com",
      password: "123456",
      carts: [],
      role: "user",
    };
    const result = await this.usersDao.signup(user);
    assert.equal(result.first_name, "Leonardo");
  });

  it("Should update password", async function () {
    this.timeout(TEST_TIMEOUT);
    const newPassword = "1234567";
    await this.usersDao.updatePassword(TEST_USER_ID, newPassword);
    const updatedUser = await getUpdatedUser(this.usersDao, TEST_USERNAME);
    assert.equal(updatedUser.password, newPassword);
  });

  it("Should update cart", async function () {
    this.timeout(TEST_TIMEOUT);
    const cartId = "65402d55da7abee203738dd2";
    await this.usersDao.updateCart(TEST_USER_ID, cartId);
    const updatedUser = await getUpdatedUser(this.usersDao, TEST_USERNAME);
    assert.ok(updatedUser.carts.includes(cartId));
  });

  it("Should update role", async function () {
    this.timeout(TEST_TIMEOUT);
    const role = "admin";
    await this.usersDao.updateRole(TEST_USER_ID, role);
    const updatedUser = await getUpdatedUser(this.usersDao, TEST_USERNAME);
    assert.equal(updatedUser.role, role);
  });
});
