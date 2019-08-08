import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.36.16.92:3000'
});

export default api;