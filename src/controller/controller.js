const usersModel = require("../database/schemas.js");

async function getUserData({ username, password }) {
  return await usersModel.find({ username, password });
}

async function userExists(username) {
  return await usersModel.findOne({ username });
}

async function auth(req, res) {
  const { body } = req;

  try {
    const user = await usersModel.findOne(body);
    res.json(user)
  } catch (err) {
    res.json({ err})
  }
}

async function createUser(req, res) {
  const { body } = req;

  try {
    await usersModel.create(body);
    return res.status(200).json({ message: "Created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Error creating user" });
  }
}


module.exports = {
  getUserData,
  userExists,
  createUser,
  auth
};
