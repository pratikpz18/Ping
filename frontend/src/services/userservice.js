import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
  // getUserBoard() {
  //   return axios.get(API_URL + 'dashboard', { headers: authHeader() });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
  logout() {
    localStorage.removeItem("user");
  }
}

export default new UserService();