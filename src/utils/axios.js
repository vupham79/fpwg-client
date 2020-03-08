import axios from "axios";
require("dotenv").config();

export default ({
  headers,
  method = "GET",
  url,
  data,
  params,
  baseURL = process.env.REACT_APP_API_URL
}) => {
  return axios({
    headers,
    method,
    url,
    data,
    params,
    baseURL,
    withCredentials: true
  });
};
