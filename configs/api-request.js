import axios from 'axios';
import Cookies from 'js-cookie';

const dev = process.env.NODE_ENV !== "production";

axios.defaults.baseURL = dev ? "http://localhost:3000/api" : "https://lendbiz-staging.herokuapp.com/api";

const accessToken = Cookies.get('access-token');
if (accessToken) {
    axios.defaults.headers.Authorization = accessToken;
}

axios.interceptors.response.use((res) => {
  // console.log(res.data.Status.Code);
  // if (res.data.Status.Code === '3') {
  //   Cookies.remove('access_token');
  //   // const route = useRouter();
  //   // history.push({ pathname: '/login' })
  // }
  return res;
});
export default axios;
