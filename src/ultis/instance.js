import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:1402/',
    timeout: 1000,
    headers: { token: process.env.REACT_APP_TOKEN_CONFIRM }
});