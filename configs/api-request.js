import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = "http://localhost:3000/api";

const accessToken = Cookies.get('access-token');
if (accessToken) {
  axios.defaults.headers.Authorization = accessToken;
}

export default axios;
