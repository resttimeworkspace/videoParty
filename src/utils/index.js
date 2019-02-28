import axios from "axios";
const request = axios.create({
   baseURL: "http://xuanshi.ninewe.com",
  // baseURL: "",
});

export default request;
