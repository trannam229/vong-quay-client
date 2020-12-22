import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3002/" : "https://lendbiz-staging.herokuapp.com/"
axios.defaults.baseURL = url + "api";

const accessToken = Cookies.get('access-token');
if (accessToken) {
  axios.defaults.headers.Authorization = accessToken;
}

axios.interceptors.response.use((res) => {
  
 
  if(res.config.url === '/chart-info') return res;

  if (res.data.Status.Code === '3' || res.status == 403) {
    Cookies.remove('access_token');
    window.location.href = url + "/login"
    return
  }

  if (res.config.method === 'post' && res.data.Status.Code === '0') {
    notification.success({
      message: 'Notice',
      description: 'Thao tác thành công',
      placement: 'bottomRight'
    });
  }

  if (res.data.Status.Code !== '0') {
    notification.error({
      message: 'Error',
      description: res.data.Status.Message,
      placement: 'bottomRight'
    });
    throw res;
  }
  return res;
});

export default axios;
