import axios from "axios";

const API_URL = "http://localhost:5189/api"; // Update with your API's URL

export const getProducts = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/Products?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/Orders`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

export const getCustomers = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/Customers?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch customers: " + error.message);
  }
};

export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_URL}/Inventory`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch inventory: " + error.message);
  }
};

export const getSuppliers = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/Suppliers?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch suppliers: " + error.message);
  }
};
