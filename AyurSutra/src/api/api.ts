import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot backend
  withCredentials: true, // if you need cookies/sessions
});

export default api;
