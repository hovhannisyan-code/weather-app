import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:3001', // todo create locale .env and set REACT_APP_API_URL
});
// http.interceptors.request.use # set config.headers.Authorization
// http.interceptors.response.use # check if error.response.status = 401 -> dispatch(logout)
export { http };