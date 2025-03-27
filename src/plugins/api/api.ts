import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.API_URL,
    timeout: 1000 * 60 * 5,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
