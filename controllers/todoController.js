const todoModel = require("../models/ToDoModel");

// create ToDo
const todoController = async (req, res) => {
    console.log("Mila kya frontend se? ==>", req.body);
    try {
        const { title, description, createdBy, date } = req.body
        if (!createdBy) {
            return res.status(400).send({ message: "User ID missing" });
        }

        if (!title || !description || !createdBy || !date) {
            return res.status(404).send({
                success: false,
                message: "Please provide title and description and Date"
            });
        }
        const todo = new todoModel({ title, description, createdBy, date });
        const result = await todo.save();
        return res.status(200).json({
            success: true,
            message: "Your Task has been created successfully",
            result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In create ToDo API",
            error
        });
    }
}

//get ToDO
const gettodoController = async (req, res) => {
    try {
        // get user id
        const userid = req.user.id;
        if (!userid) {
            return res.status(500).send({
                success: false,
                message: "User NOt Found with this Id"
            });
        }
        // find Task
        const todos = await todoModel.find({ createdBy: req.user.id });
        if (!todos) {
            return res.status(404).send({
                success: false,
                message: "No todoList Found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Successfully Get todoList",
            todos
        });
    } catch (error) {
        console.log("gettodoController error ", error);
        return res.status(500).send({
            success: false,
            message: "Error In get todoList API",
            error
        });
    }
}

//update ToDo
const updatetodoController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "please provide todo Id"
            });
        }
        const data = req.body
        //update
        const todo = await todoModel.findByIdAndUpdate(id, { $set: data }, { returnOriginal: false });
        console.log("updated todo", todo);
        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "Not Found ToDo List"
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "ToDo List Updated Successfully",
                todo
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Update API",
            error
        });
    }
}

//delete ToDo
const deletetoController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Please Provide ToDo ID"
            });
        }
        const todo = await todoModel.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "No Food Was Found"
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Your Task Was Deleted Successfully"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Delete Task",
            error
        });
    }
}


module.exports = { todoController, gettodoController, updatetodoController, deletetoController }