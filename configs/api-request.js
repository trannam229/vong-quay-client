import axios from 'axios';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';

const dev = process.env.NODE_ENV !== "production";
const urlOrigin = window.location.origin + ":3000/";
const url = dev ? "http://localhost:3002/" : urlOrigin;
axios.defaults.baseURL = url + "api";

const options = {
    autoClose: 5000,
    hideProgressBar: true,
    position: toast.POSITION.TOP_CENTER,
    pauseOnHover: true,
};
const accessToken = Cookies.get('access-token');
if (accessToken) {
    axios.defaults.headers.Authorization = accessToken;
}

axios.interceptors.response.use((res) => {


    if (res.config.url === '/chart-info') return res;

    if (res.data.Status.Code === '3' || res.status == 403) {
        Cookies.remove('access_token');
        window.location.href = url + "/login"
        return
    }

    if (res.config.method === 'post' && res.data.Status.Code === '0') {
        options.type = toast.TYPE.INFO,
            toast("Thao tác thành công", options);
    }

    if (res.data.Status.Code !== '0') {
        options.type = toast.TYPE.ERROR
        toast(res.data.Status.Message, options)
        throw res;
    }
    return res;
});

export default axios;
