import axios from "axios";
const request = axios.create({
  baseURL: "http://xuanshi.ninewe.com",
  // baseURL: "",
});

export default request;

export const version = 0; // 1 有链接的版本， 0 没有链接