// create todo
import axios from "axios";

export const createTodo = async (todoData) => {
    const userData = JSON.parse(localStorage.getItem("todoApp"));
    const token = userData?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };

    const response = await axios.post("http://localhost:5000/api/todo/create", todoData, config);
    return response.data;
};


// get all todo
const getAllTodos = async () => {
    const userData = JSON.parse(localStorage.getItem('todoApp'));
    const token = userData.token;
    console.log("Token being sent:", token);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get("http://localhost:5000/api/todo/getall", config);
    console.log("getall todos response :", response.data);
    return response.data;
};


// Update ToDo 
const UpdateToDo = async (id, data) => {
    const userData = JSON.parse(localStorage.getItem("todoApp"));
    const token = userData?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const response = await axios.patch(`http://localhost:5000/api/todo/update/${id}`, data, config);
    return response.data;
};



//Delete Todo
export const deleteTodo = async (id) => {
    const userData = JSON.parse(localStorage.getItem("todoApp"));
    const token = userData?.token;
    console.log("Delete token", token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, config);
};

const TodoService = { createTodo, getAllTodos, UpdateToDo, deleteTodo };
export default TodoService;
