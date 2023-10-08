import axios from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
instance.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
        req.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return req;
});
instance.interceptors.response.use(undefined, (err) => {
    if (err?.response?.status === 401) {
        localStorage.removeItem('accessToken');
    }
    return Promise.reject(err); 
});

export default instance;