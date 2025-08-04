import React, { useState } from 'react'
import EditTodo from '../EditTodo'
import TodoService from '../../Services/TodoServices';
import toast from 'react-hot-toast';

const Caard = ({ alltask = [], getUserTask }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEdit = (Task) => {
        setSelectedTask(Task);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this todo?");
        if (!confirm) return;

        try {
            await TodoService.deleteTodo(id);
            toast.success("Task deleted successfully!");
            getUserTask();
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert("Failed to delete todo.");
        }
    }

    return (
        <>
            <div className='card-container px-2' style={{ marginLeft: '-5vh' }}>
                <div className='row gx-1 gy-0' style={{ marginLeft: '5vh' }}>

                    {alltask.map((Task) => (

                        < div className='col-sm-12 col-md-6 col-lg-4 mb-2' style={{ marginLeft: '-30px' }} key={Task._id}>
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

                                <div
                                    className="card-footer bg-transparent border-primary"
                                    style={{ padding: '2px', height: '9vh' }}
                                >
                                    <button
                                        className="btn btn-warning"
                                        title="Edit Task"
                                        onClick={() => handleEdit(Task)}
                                        style={{ marginLeft: '30vh' }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger ms-2"
                                        title="Delete Task"
                                        onClick={() => handleDelete(Task._id)}
                                        style={{ marginLeft: '30vh' }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
            {
                selectedTask && (
                    <EditTodo
                        Task={selectedTask}
                        setShowModel={() => setSelectedTask(null)}
                        getUserTask={getUserTask}
                    />
                )
            }
        </>
    )
}

export default Caard
