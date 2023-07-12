import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default server;