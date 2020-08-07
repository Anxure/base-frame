import axios from 'axios'
import { HTTP_CODE } from '@/config/dict'
import { Message } from 'element-ui';
const baseURL = process.env.VUE_APP_MOCK ? '/mock' : process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API
const request = axios.create({
  timeout: 10000,
  baseURL
});
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);
request.interceptors.response.use(
  response => {
    if (response.data.code === 200 || response.data.code === 0) {
      return Promise.resolve(response.data || []);
    } else {
      Message({
        message: response.data.msg,
        type: 'error'
      })
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    const tips = error.response.status in HTTP_CODE ? HTTP_CODE[error.response.status] : error.response.data.message;
    Message({
      message: tips,
      type: 'error'
    })
  }
);
export default request;
export const get = (url, params = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'get', url, params, ...config }).then(resolve, reject));
};
export const post = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'post', url, data, ...config }).then(resolve, reject));
};
export const put = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'put', url, data, ...config }).then(resolve, reject));
};
export const deleteFn = (url, params = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'delete', url, params, ...config }).then(resolve, reject));
};
