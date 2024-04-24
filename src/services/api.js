import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// token: 5jqXQ63ARpqjfJRb73aoU6

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
