import axios from 'axios';

export const SearchUser = (data) => {

    return axios.post('http://localhost:4000/users/dashboard/search',data)
        .then(res => res.data);
};

export const AddFreind = (data) => {
    return axios.post('http://localhost:4000/users/dashboard/search/addfriend',data)
                .then(res=> res.data)
  }