import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Token ${token}`;
  }

  if (request.method === "post" && request.data) {
    request.data.csrftoken = (await window.cookieStore.get("csrftoken")).value;
  }

  return request;
});

export default instance;

