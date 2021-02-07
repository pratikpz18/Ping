import axios from 'axios';

export const UserLogin = (data) => {

    return axios.post('http://localhost:4000/users/login',data)
        .then(res => res);
};