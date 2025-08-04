import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Authstyle.css';
import logo from '../../Assets/images/user-3297.png';
import Authservices from '../../Services/Authservices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    //login function
    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            const data = { email, password }
            const res = await Authservices.loginUser(data);
            toast.success(res.data.message);
            navigate('/home');
            localStorage.setItem("todoApp", JSON.stringify({
                token: res.data.token,
                user: res.data.user
            }));

            console.log(res.data);
        } catch (err) {
            toast.error(getErrorMessage(err));
            console.log(err);
        }
    };


    return (
        <div className='form-container'>
            <div className='form'>
                <div className='image'>
                    <img src={logo} alt='userlogoimage' width={'50%'} height={130} />
                </div> <br />
                <div className='mb-3'>
                    <input type='email' required className='form-control' placeholder='Enter Email' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className='mb-3'>
                    <input type='password' required className='form-control' placeholder='Enter Password' value={password} onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                </div>
                <div className='form-bottom'>
                    <p className='text-center'>
                        Not a user? Please &nbsp;
                        <Link to='/Register'>Register</Link>
                    </p>
                </div>
                <button type='submit' className='login-btn' onClick={loginHandler}>Login</button>
            </div>
        </div>
    )
}
export default Login
