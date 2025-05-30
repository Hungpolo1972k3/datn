import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    const tokenRaw = window.localStorage.getItem("persist:auth");
    let token = null;
    if (tokenRaw) {
      try {
        const parsed = JSON.parse(tokenRaw);
        const userData = parsed.user ? JSON.parse(parsed.user) : null;
        token = userData?.token;
      } catch (err) {
        console.error("Error parsing token from localStorage:", err);
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
