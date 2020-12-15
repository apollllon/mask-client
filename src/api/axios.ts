import axiosBase from "axios";

export const axios = axiosBase.create({
  baseURL: "http://localhost:8000",
  headers: {
    "content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
