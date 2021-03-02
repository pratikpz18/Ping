import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
  getUser(value) {
    return axios.get(`http://localhost:4000/users/dashboard/search/${value}`)
                .then(res=> res.data)
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
  logout() {
    localStorage.removeItem("user");
  }
}

export default new UserService();