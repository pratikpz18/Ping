import axios from 'axios';


export const getUsersFriend = (data) => {

    return axios.post('http://localhost:4000/users/dashboard/messages',data)
        .then(res => res.data);
};