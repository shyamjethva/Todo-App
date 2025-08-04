import React from 'react'
import toast from 'react-hot-toast';
import TodoServices from '../Services/TodoServices';

const PopupModel = ({ title, setTitle, description, setDescription, showModel, setShowModel, date, setDate, getUserTask }) => {
    //handle close 
    const handleClose = () => {
        setShowModel(false)
    }

    //handle submit
    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('todoApp'))
            const id = userData && userData.user.id
            if (!id) {
                console.error("User ID missing — cannot create todo");
            }
            const data = { title, description, date, createdBy: id }

            if (!title || !description || !date) {
                return toast.error("Please Provide All Field");
            }

            const todo = await TodoServices.createTodo(data);
            await getUserTask();
            toast.success("Task Created Successfully");
            setShowModel(false);
            console.log(todo);
            setTitle("")
            setDescription("")
            setDate("")


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", error);

        }
    }


    return (
        <>
            {showModel && (

                <div className='popup-model' tabIndex='-1' role='dialog'  >

                    <div className='model-content'>
                        <div className='model-header'>
                            <h5 className='model-title'>
                                Add New Task
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
                            </div><br />
                            <div className='form-floating'>
                                <input type='date' placeholder='date' className='form-control' value={date} onChange={(e) => setDate(e.target.value)} />
                                <label htmlFor='floatingTextarea'>Date</label>
                            </div>
                        </div>
                        <div className='model-footer'>
                            <button type='button' className='btn btn-secondary' onClick={handleClose} style={{ marginLeft: '35vh' }}>Close</button> &nbsp;
                            <button type='button' className='btn btn-primary' onClick={handleSubmit} style={{ float: 'right' }}>Create</button>
                        </div>
                    </div>
                </div>

            )};
        </>
    );
}


export default PopupModel
