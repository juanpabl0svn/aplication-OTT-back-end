const { Router } = require("express");
const { getUserData, userExists, createUser,auth } = require("../controller/controller.js");


const router = Router()
router.get('/',(req,res)=>{
  res.send('hola')
})

router.post('/auth',auth)
router.post('/create',createUser)



module.exports = router
