import React, { useState } from 'react'
import toast from 'react-hot-toast';
import TodoService from '../Services/TodoServices';

const EditTodo = ({ Task, setShowModel, getUserTask }) => {
    const [title, setTitle] = useState(Task.title)
    const [description, setDescription] = useState(Task.description)
    const [date, setDate] = useState(Task.date)
    const [isCompleted, setIsCompleted] = useState(Task.isCompleted)

    //handle close
    const handleClose = () => {
        setShowModel(false)
    }

    const selecthandle = (e) => {
        const value = e.target.value;
        const parsed = value === "true";
        console.log("Selected value :", value);
        console.log("Parsed boolean:", parsed);
        setIsCompleted(parsed)
    };

    const id = Task._id;


    //update
    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('todoApp'));
            const userId = userData?.user?.id;
            const data = { title, description, date, createdBy: userId, isCompleted };
            console.log("Submitting isCompleted value:", isCompleted, typeof isCompleted);


            if (!title || !description || !date) {
                return toast.error("Please Provide All Field")
            }
            console.log("TASK ID:", Task._id);
            console.log("TASK OBJECT:", Task);

            await TodoService.UpdateToDo(id, data);
            await getUserTask();
            setShowModel(false);
            toast.success("Task Updated Successfully");
            setShowModel(false);
            setTitle("")
            setDescription("")
            setDate("")
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (

        <>
            {Task && (

                <div className='model' tabIndex='-1' role='dialog'>
                    <div className='model-dialog' role='document' style={{ backgroundColor: "lightgray", padding: '20px', borderRadius: '10px', width: '60vh' }}>
                        <div className='model-content'>
                            <div className='model-header'>
                                <h5 className='model-title'>
                                    Update Your Task
                                </h5>
                                <button className='btn-close' aria-label='close' style={{ float: 'right', marginTop: '-4vh' }}>
                                    <span aria-hidden='true'>
                                        &times;
                                    </span>
                                </button>
                            </div>
                            <div className='model-body'>
                                <div className='mb-3'>
                                    <label className='form-label' >Title</label>
                                    <input type='text' placeholder='title' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='form-floating'>
                                    <textarea className='form-control' id='floatingtextaea' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    <label htmlFor='floatingTextarea'>Description</label>
                                </div>
                                <div className='my-3'>
                                    <select
                                        className='form-select'
                                        value={isCompleted.toString()}
                                        onChange={selecthandle}
                                    >
                                        <option value="Status" disabled>Select Status</option>
                                        <option value="false">Incomplete</option>
                                        <option value="true">Completed</option>
                                    </select>
                                </div>

                                <div className='form-floating'>
                                    <input type='date' placeholder='date' className='form-control' value={date} onChange={(e) => setDate(e.target.value)} />
                                    <label htmlFor='floatingTextarea'>Date</label>
                                </div>
                            </div>
                            <div className='model-footer'>
                                <button type='button' className='btn btn-secondary' onClick={handleClose} style={{ marginLeft: '35vh' }}>Close</button> &nbsp;
                                <button type='button' className='btn btn-primary' onClick={handleSubmit} style={{ float: 'right', marginTop: "-6vh" }}>update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTodo
