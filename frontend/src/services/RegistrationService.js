import axios from 'axios';

export const UserRegistration = (data) => {

    return axios.post('http://localhost:4000/users/register',data)
        .then(res => res);
};
