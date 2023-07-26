const { Router } = require("express");
const { getUserData, userExists, createUser } = require("../controller/controller.js");


const router = Router()


router.post('/create',createUser)


module.exports = router
