import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lostandfoundback-184f1a940482.herokuapp.com/api', 
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('https://lostandfoundback-184f1a940482.herokuapp.com/api/User/refresh', { refreshToken });
    if (response.status === 200) {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default api;
