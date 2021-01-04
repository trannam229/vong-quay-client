import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.less";
import "../assets/style.less";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function MyApp({Component, pageProps}) {
    return <>
        <ToastContainer/>
        <Component {...pageProps} />
    </>;
}
