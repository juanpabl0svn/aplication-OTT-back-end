const { Router } = require("express");
const {
  deleteAccount,
  createUser,
  auth,
  checkJWT,
} = require("../controller/controller.js");

const cookieParser = require("cookie-parser");




const router = Router();

router.use(cookieParser());


router.get("/", (req, res) => {
  res.send("Welcome to my api");
});

router.get("/check/:token", checkJWT);

router.post("/auth", auth);
router.post("/create", createUser);

router.delete('/delete/:token',deleteAccount)
module.exports = router;
