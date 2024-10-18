import axios from 'axios';
import conf_env from '../conf_env/conf_env.js';

const api = axios.create({
    baseURL: conf_env.backendURL,
    withCredentials: true, // Include credentials in requests
});

export default api;