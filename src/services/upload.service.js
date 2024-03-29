/*  eslint-disable*/

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api.post("/toilets/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};


export default {uploadImage}