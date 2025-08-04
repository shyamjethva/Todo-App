const express = require('express')
const { usercontroller, loginController, GetUserController } = require('../controllers/userController')

//router object
const router = express.Router()

//router
//register router
router.post("/register", usercontroller)

router.post("/login", loginController)

//get User
router.get("/getuser", GetUserController)

//exports
module.exports = router