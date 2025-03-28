import axios from "axios";

export const server = axios.create({});

server.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);
