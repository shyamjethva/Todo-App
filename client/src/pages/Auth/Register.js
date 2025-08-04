import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/user-3297.png';
import Authservices from '../../Services/Authservices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [contact, setContact] = useState('')

    const navigate = useNavigate();

    //login function
    const Register = async (e) => {
        try {
            e.preventDefault()
            const data = { username, email, password, contact }
            const res = await Authservices.registerUser(data);
            toast.success(res.data.message);
            navigate('/Login');
            console.log(res.data);
        } catch (err) {
            toast.error(getErrorMessage(err));
            console.log(err);
        }
    }
    return (
        <div className='form-container'>
            <div className='form'>
                <div className='image'>
                    <img src={logo} alt='userlogoimage' width={'50%'} height={130} />
                </div> <br />
                <div className='mb-3'>
                    <input type='text' required className='form-control' placeholder='Enter Username' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                </div>
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
                <div className='mb-3'>
                    <input type='text' required className='form-control' placeholder='Enter Contact Number' value={contact} onChange={(e) => {
                        setContact(e.target.value)
                    }} />
                </div>
                <div className='form-bottom'>
                    <p className='text-center'>
                        already have account?   &nbsp;
                        <Link to='/Login'>Login</Link>
                    </p>
                </div>
                <button type='submit' className='login-btn' onClick={Register}>Register</button>
            </div>
        </div>
    )
}


export default Register
