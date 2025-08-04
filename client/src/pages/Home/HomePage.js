import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Layout/Navbar'
import PopupModel from '../../component/popupModel'
import TodoService from '../../Services/TodoServices'
import Caard from '../../component/Card/Caard'

const HomePage = () => {
    const [shoeModel, setShowModel] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [alltask, setAllTask] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [loading, setLoading] = useState(true);

    const openModelHandler = () => {
        setShowModel(true)
    }

    useEffect(() => {
        getUserTask();
    }, [])

    const getUserTask = async () => {
        try {
            const data = await TodoService.getAllTodos();
            setAllTask(data.todos);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    //  Filtered Todos
    const filteredTodos = alltask.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === "all"
                ? true
                : filterStatus === "complete"
                    ? todo.isCompleted === true || todo.isCompleted === "true"
                    : todo.isCompleted === false || todo.isCompleted === "false";

        return matchesSearch && matchesStatus;
    })


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='add-task'>
                    <h1>Your Task</h1>

                    {/*  Search & Filter */}
                    <div className='flex flex-col md:flex-row gap-2 mt-2 mb-4'>
                        <input
                            type='search'
                            placeholder='🔍 Search Your Task'
                            className='border px-3 py-2 rounded w-full md:w-1/2'
                            style={{ marginRight: '5vh', marginTop: '-10vh' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className='border px-3 py-2 rounded w-full md:w-1/4'
                            style={{ marginRight: '20vh', marginTop: '-20px' }}
                        >
                            <option value="all">All</option>
                            <option value="complete">Completed</option>
                            <option value="incomplete">Incomplete</option>
                        </select>

                        <button className='btn btn-primary' onClick={openModelHandler}>
                            <b>Create Task </b>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

                {/* Status Banner */}
                <div
                    className={`px-4 py-2 rounded text-white font-semibold text-center mb-4 ${filterStatus === "complete"
                        ? "bg-green-600"
                        : filterStatus === "incomplete"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                        }`}
                >
                    {filterStatus === "complete"
                        ? " Showing: Completed Tasks"
                        : filterStatus === "incomplete"
                            ? " Showing: Incomplete Tasks"
                            : " Showing: All Tasks"}
                </div>


                {/* Show Filtered Tasks */}
                {filteredTodos && <Caard alltask={filteredTodos} getUserTask={getUserTask} />}

                <PopupModel
                    showModel={shoeModel}
                    setShowModel={setShowModel}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    date={date}
                    setDate={setDate}
                    getUserTask={getUserTask}
                />
            </div>
        </>
    )
}

export default HomePage;

