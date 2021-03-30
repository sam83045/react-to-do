import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:9001/"
      : "https://shoaib-to-do-app.herokuapp.com/"
});

export default instance;