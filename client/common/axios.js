import axios from 'axios';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      console.log('Unauthorized access');
      return Promise.reject(error);
    } else if (status === 403) {
      console.log('Unauthorized access');
    } else if (status === 404) {
      console.log('Post not found');
    } else {
      console.error('An error occurred:', error);
    }
    return Promise.reject(error);
  }
);
export default axios;
