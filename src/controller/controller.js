const model = require("../database/schemas.js");

async function getUserData({ username, password }) {
  return await usersModel.find({ username, password });
}

async function userExists(username) {
  return await usersModel.findOne({ username });
}

async function createUser(req, res) {
  const { body } = req;
  try {
    await usersModel.create(body);
    return res.status(200).send("Created successfully");
  } catch (err) {
    return res.status(403).send("Error creating user");
  }
}

module.exports = {
  getUserData,
  userExists,
  createUser
};
