import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')

    //logout 
    const logoutHandler = () => {
        localStorage.removeItem('todoApp')
        toast.success('Logout Successfully');
        navigate('/Login');
    };

    useEffect(() => {
        try {
            const stored = localStorage.getItem("todoApp");
            if (stored) {
                const userdata = JSON.parse(stored);
                if (userdata?.user?.username) {
                    console.log("Username data ==>", userdata.user.username);
                    setUsername(userdata.user.username);
                }
            }
        } catch (err) {
            console.error("Invalid localStorage data", err);
            setUsername('');
        }
    }, []);


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <h4 className='navbar-brand'>
                            <i class="fa-solid fa-user"></i> &nbsp;
                            <i>Welcome</i>&nbsp; <b>{username}</b>
                        </h4>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to='/todolist'>ToDo List</Link>
                            </li>

                            <li className="nav-item">
                                <button className='nav-ink' title='logout' onClick={logoutHandler}>
                                    <i class="fa-solid fa-right-from-bracket" />
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
