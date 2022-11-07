const { Router } = require("express");
const m$user = require("../modules/user.module");
const userSession = require('../helpers/middleware')
const response = require("../helpers/response");

const UserController = Router();

// get => Mengambil data
// post => Create data
// put => Update data
// delete => Delete data

/**
 * List User
 *
 * http://localhost:3000/api/user
 */

UserController.get("/", userSession, async (req, res) => {
  const list = await m$user.listUser();

  response.sendResponse(res, list);
});

/**
 * Create User
 * @param {string} nama
 * @param {string} email
 * @param {string} password
 *
 * http://localhost:3000/api/user
 */

UserController.post("/", async (req, res) => {
  // req.body input dari client yang berupa json
  const add = await m$user.createUser(req.body);

  // response helper
  response.sendResponse(res, add);
});

/**
 * Update User
 * @param {number} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 *
 * http://localhost:3000/api/user
 */

UserController.put("/:id", userSession, async (req, res) => {
  const { id } = req.params;
  //req body berisis data yang dikirim ke client
  const update = await m$user.updateUser(req.body, Number(id));
  response.sendResponse(res, update);
});

/**
 * Delete User
 * @param {number} id
 *
 * http://localhost:000/api/user
 */
UserController.delete("/:id", userSession, async (req, res) => {
  const del = await m$user.deleteUser(Number(req.params.id));

  response.sendResponse(res, del);
});

module.exports = UserController;
