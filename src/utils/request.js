import axios from 'axios'
import { HTTP_CODE } from '@/config/dict'
const baseURL = process.env.VUE_APP_MOCK ? '/mock' : process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API
const request = axios.create({
  timeout: 10000,
  baseURL,
  withCredentials: true
});
request.interceptors.request.use(
  (config) => {
  // config.headers['token'] = sessionStorage.getItem('token') || ''
  // Toast.loading({
  //   message: '加载中...',
  //   loadingType: 'spinner'
  // });
  // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
  // if (config.url.includes('pur/contract/export')) {
  //   config.headers['responseType'] = 'blob'
  // }
  // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
  // if (config.url.includes('pur/contract/upload')) {
  //   config.headers['Content-Type'] = 'multipart/form-data'
  // }
  //
    return config;
  },
  (err) => Promise.reject(err)
);
request.interceptors.response.use(
  response => {
    if (response.data.code === 200 || response.data.code === 0) {
      // Toast.clear();
      return Promise.resolve(response.data || []);
    } else {
      // Toast.fail(response.data.msg);
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    if (error.response) {
      const tips = error.response.status in HTTP_CODE ? HTTP_CODE[error.response.status] : error.response.data.message;
      console.log(tips);
      // Toast.fail(tips);
      // if (error.response.status === 401) {
      //   router.push({
      //     path: `/login`
      //   })
      // }
      return Promise.reject(error);
    } else {
      // Toast.fail(error);
      return Promise.reject(new Error('请求超时, 请刷新重试'));
    }
  }
);
export default request;
/* 统一封装get请求 */
export const get = (url, params = {}, config = {}) => {
  // params = { token: getToken(),...params };
  return new Promise((resolve, reject) => request({ method: 'get', url, params, ...config }).then(resolve, reject));
};

/* 统一封装post请求  */
export const post = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'post', url, data, ...config }).then(resolve, reject));
};
export const put = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => request({ method: 'put', url, data, ...config }).then(resolve, reject));
};
