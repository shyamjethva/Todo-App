const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: String,
        required: true,
        default: false
    },
    createdBy: {
        ref: 'users',
        type: mongoose.Schema.ObjectId
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true })

const todoModel = mongoose.model('todo', todoSchema)
module.exports = todoModel