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
  const geniun = await jwt.verify(token, process.env.SECRET_KEY);
  if (geniun) {
    return res.status(200).json({state: 'Verify'})
  }
  return res.status(403).json({state: 'Something went wrong'})
}

async function auth(req, res) {
  const { body } = req;
  const user = await usersModel.findOne(body);
  if (user){
    const token = await jwt.sign({username : body.username}, process.env.SECRET_KEY)
    return res.status(200).json({token, username : body.username})
  }
  return res.status(403).json({error: 'Not found'})
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
  checkJWT
};
