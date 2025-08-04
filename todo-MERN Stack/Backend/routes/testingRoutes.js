const express = require('express');
const { testcontroller } = require('../controllers/TestController');


//router object
const router = express.Router();

//Routers
router.get('/test', testcontroller)



//exports
module.exports = router