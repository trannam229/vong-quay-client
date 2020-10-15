import axios from 'axios';
import Cookies from 'js-cookie';


axios.defaults.baseURL = "http://localhost:3000/api";


/* eslint no-param-reassign: ["error", { "props": true,
  "ignorePropertyModificationsFor": ["request"] }] */
// axios.interceptors.request.use((request) => {


// //   if (Cookies.get('access-token')) {
// //     // request.headers.Authorization = `Bearer ${Cookies.get('access-token')}`;
// //   } else {
// //     delete request.headers.Authorization;
// //   }

//   return request;
// });

// const errHandler = (error) => {
// //   publishLoadingStatus(false);
//   if (error.response.status === 413) throw new Error(`Tập tin đính kèm không được quá ${process.env.FILE_SIZE_SCAN}mb.`);
//   if (error.response.status === 401 && error.response.config.url !== `${URL_GATEWAY}/auth/login/user`) window.location.replace(`${process.env.URL_WEB_APP}:${process.env.PORT_WEB_APP}/user/login`);
//   throw new Error(error.response.data.meta.error.errorMessage);
// };

// axios.interceptors.response.use(
//   (response) => {
//     publishLoadingStatus(false);
//     return response;
//   },
//   (error) => errHandler(error),
// );

export default axios;
