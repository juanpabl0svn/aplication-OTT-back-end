const usersModel = require("../database/schemas.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function userExists(username) {
  return await usersModel.findOne({ username });
}

function actualDate() {
  const today = new Date();

  const day = today.getDate();

  const month = today.getMonth() + 1;

  const year = today.getFullYear();

  return new Date(`${month}/${day}/${year}`);
}

async function checkJWT(req, res) {
  const { token } = req.params;

  try {
    const { username } = await jwt.verify(token, process.env.SECRET_KEY);

    const exist = await userExists(username);

    if (exist && exist.endMerbership > actualDate()) {
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
  if (user && user.endMerbership > actualDate()) {
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
    const token = await jwt.sign(
      { username: body.username },
      process.env.SECRET_KEY
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Error creating user" });
  }
}

async function deleteAccount(req, res) {
  const { token } = req.params;
  try {
    const data = await jwt.verify(token, process.env.SECRET_KEY);

    await usersModel.deleteOne({ username: data.username });
    return res.status(200).json({ message: "Correct" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createUser,
  auth,
  checkJWT,
  deleteAccount,
};
