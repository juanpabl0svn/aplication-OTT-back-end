const { Router } = require("express");
const { getUserData, userExists, createUser,auth,checkJWT } = require("../controller/controller.js");


const router = Router()
router.get('/',(req,res)=>{
  res.send('hola')
})

router.get('/check/:token',checkJWT)

router.post('/auth',auth)
router.post('/create',createUser)



module.exports = router
