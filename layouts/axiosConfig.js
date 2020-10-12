import axios from 'axios';
import convert from 'xml-js';

export const lAxios = axios.create({
  headers: {
    post: {
      'Content-Type': 'text/xml',
    },
  },
});

//response
lAxios.interceptors.response.use(response => {
  return convert.xml2js(response.data, {compact: true}); ;
}, error => {
  return Promise.reject(error);
});
