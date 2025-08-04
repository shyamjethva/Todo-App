import React from 'react';
import { Link } from 'react-router-dom';
import todo from '../../Assets/images/todo_image.webp'
import './Landing.css';

const Landing = () => {
    return (
        <div className='hero'>
            <div className='intro-text'>
                <h1>
                    <span className='tagline1'>Organize work and life</span> <br />
                    <span className='tagline2'>Finally</span>
                </h1>
                <p>
                    Type just anything into the taskd field and ToDoList <br />
                    on-of-its-kind natural language recognistion will instantly fill your to-do-list
                </p>
                <Link className='btn red' to='/register'>Register Now</Link><br />
                <Link className='btn blue' to='/Login'>Login Now</Link>
            </div>
            <div className='car' style={{ marginLeft: '-20vh' }} >
                <img src={todo} alt='TodoImage' width={'120%'} height={475} />
            </div>

        </div>
    )
}

export default Landing
