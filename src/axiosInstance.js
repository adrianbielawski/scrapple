import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://fafik.local:8000'
});

instance.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = `Token ${token}`;
    }

    return request;
});

export default instance;