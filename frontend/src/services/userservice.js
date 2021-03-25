import axios from 'axios';

const API_URL = 'http://localhost:4000/users/';

class UserService {
  getUser(value) {
    return axios.get(`http://localhost:4000/users/dashboard/search/${value}`)
                .then(res=> res.data)
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getUserById(userid){
    return axios.get(`http://localhost:4000/users/dashboard/profile/${userid}`)
                .then(res=>res.data)
  }
  
  logout() {
    localStorage.removeItem("user");
  }

  update(userid,data){
    return axios.put(`http://localhost:4000/users/dashboard/editprofile/${userid}`,data)
                .then(res=>res.data)
  }

  getallUsers(userid){
    return axios.get(`http://localhost:4000/users/dashboard/profile/allusers/${userid}`)
                .then(res=>res.data)
  }
}

export default new UserService();