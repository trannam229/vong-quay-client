import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

const dev = process.env.NODE_ENV !== "production";

axios.defaults.baseURL = dev ? "http://localhost:3000/api" : "https://lendbiz-staging.herokuapp.com/api";

const accessToken = Cookies.get('access-token');
if (accessToken) {
  axios.defaults.headers.Authorization = accessToken;
}

axios.interceptors.response.use((res) => {
  if(res.config.url === '/chart-info') return res;

  if (res.data.Status.Code === '3') {
    Cookies.remove('access_token');
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
