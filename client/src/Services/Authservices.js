import axios from 'axios'

const registerUser = (data) => {
    return axios.post('http://localhost:5000/user/register', data);
};
const loginUser = (data) => {
    return axios.post("http://localhost:5000/user/login", data);
};

const Authservices = { registerUser, loginUser }

export default Authservices
