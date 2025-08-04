const express = require('express')
const { todoController, gettodoController, updatetodoController, deletetoController } = require('../controllers/todoController')
const Authmiddleware = require('../middleware/Authmiddleware')

const router = express.Router()

//create ToDo
router.post('/create', Authmiddleware, todoController)

//get ToDo
router.get('/getall', Authmiddleware, gettodoController)


// update ToDo
router.patch('/update/:id', Authmiddleware, updatetodoController)

//Delete ToDo
router.delete('/delete/:id', Authmiddleware, deletetoController)

module.exports = router