import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:9090/api", 
// });

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
});

export const getTransactions = (params) =>
  API.get("api/transactions", { params });

export const getFiltered = (params) =>
  API.get("api/transactions/filter", { params });

export const getBetween = (params) =>
  API.get("api/transactions/between", { params });

export const getSummary = (params) =>
  API.get("api/transactions/summary", { params });

export const addTransaction = (data) =>
  API.post("api/transactions", data);

export const updateTransaction = (id, data) =>
  API.put(`api/transactions/${id}`, data);
