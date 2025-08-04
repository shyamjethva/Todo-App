import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Layout/Navbar'
import TodoService from '../../Services/TodoServices'

const ToDoList = () => {
    const [todoStatus, setTodoStatus] = useState("All");
    const [filterdTask, setFilterdTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alltask, setAllTask] = useState([]);

    const getUserTask = async () => {
        try {
            const data = await TodoService.getAllTodos();
            setAllTask(data.todos);
            setLoading(false);
            console.log("Fetched Todos:", data.todos);
        } catch (error) {
            console.log("Error fetching todos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTask();
    }, []);

    useEffect(() => {
        console.log("Current Filter:", todoStatus);
        const incomplete = alltask.filter(item => item.isCompleted === false || item.isCompleted === "false");
        const completed = alltask.filter(item => item.isCompleted === true || item.isCompleted === "true");

        if (todoStatus === 'incomplete') {
            setFilterdTask(incomplete);
        } else if (todoStatus === 'complete') {
            setFilterdTask(completed);
        } else {
            setFilterdTask(alltask);
        }

        console.log("Filtered Tasks:", todoStatus === 'complete' ? completed : todoStatus === 'incomplete' ? incomplete : alltask); // ✅ Debug
    }, [todoStatus, alltask]);

    return (
        <>
            <Navbar />

            <div className='filter-container'>
                <h4>Filter By Status: {todoStatus}</h4>
                <div className='filter-group'>
                    <select className='form-select' value={todoStatus} onChange={(e) => setTodoStatus(e.target.value)}>
                        <option value='All'>All</option>
                        <option value='incomplete'>Incomplete</option>
                        <option value='complete'>Complete</option>
                    </select>
                </div>
            </div>

            {loading && <h4 className="text-center">Loading Tasks...</h4>}

            {filterdTask.length === 0 && (
                <h4 className="text-center text-danger">No tasks found.</h4>
            )}

            <div className='card-container px-2' style={{ marginLeft: '5vh' }}>
                <div className='row gx-1 gy-0' style={{ marginLeft: '5vh' }}>
                    {filterdTask.map((Task) => (
                        <div className='col-sm-12 col-md-6 col-lg-4 mb-2' key={Task._id}>
                            <div
                                className="card-border-primary"
                                style={{
                                    maxWidth: '22rem',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    marginBottom: '30px'
                                }}
                            >
                                <div className="card-header d-flex justify-content-between align-items-center"
                                    style={{
                                        backgroundColor: Task.isCompleted === true || Task.isCompleted === "true" ? '#d4edda' : '#fff3cd',
                                        borderBottom: '2px solid #ccc',
                                        padding: '3px', borderRadius: '4px'
                                    }}
                                >
                                    <div className="chead">
                                        <h5>{Task.title ? Task.title.substring(0, 10) : 'No Title'}</h5><br />

                                        <span className={`badge ${Task.isCompleted === true || Task.isCompleted === "true" ? 'bg-success' : 'bg-warning'}`} style={{ padding: '6px', width: '12vh', fontSize: '15px' }}>

                                            {Task.isCompleted === true || Task.isCompleted === "true" ? 'Complete' : 'Incomplete'}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <br />
                                    <b>Title :</b> {Task.title}
                                    <p className="card-text">
                                        <b>Description :</b> {Task?.description}
                                    </p>
                                    <b>Date :</b> {Task.createdAt?.substring(0, 10)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ToDoList
