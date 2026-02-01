import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api", 
});

export const getTransactions = (params) =>
  API.get("/transactions", { params });

export const getFiltered = (params) =>
  API.get("/transactions/filter", { params });

export const getBetween = (params) =>
  API.get("/transactions/between", { params });

export const getSummary = (params) =>
  API.get("/transactions/summary", { params });

export const addTransaction = (data) =>
  API.post("/transactions", data);

export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);
