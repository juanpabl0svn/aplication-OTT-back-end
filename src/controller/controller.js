const usersModel = require("../database/schemas.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getUserData({ username, password }) {
  return await usersModel.find({ username, password });
}

async function userExists(username) {
  return await usersModel.findOne({ username });
}

async function checkJWT(req, res) {
  const { token } = req.params;

  try {
    const { username } = await jwt.verify(token, process.env.SECRET_KEY);

    const exist = await userExists(username);

    if (exist) {
      return res.status(200).json({ status: "Validate" });
    }
    return res.status(403).json({ state: "Something went wrong", err });
  } catch (err) {
    return res.status(403).json({ state: "Something went wrong", err });
  }
}

async function auth(req, res) {
  const { body } = req;
  const user = await usersModel.findOne(body);
  if (user) {
    const token = await jwt.sign(
      { username: body.username },
      process.env.SECRET_KEY
    );
    return res.status(200).json({ token });
  }
  return res.status(403).json({ error: "Not found" });
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
  auth,
  checkJWT,
};
