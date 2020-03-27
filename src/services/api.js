import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-node-jjscale.herokuapp.com/api'
});

export default api;