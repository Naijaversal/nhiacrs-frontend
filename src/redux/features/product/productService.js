import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;
const USER_URL = `${BACKEND_URL}/api/users/`;


// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Create a Request
const createRequest = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get a Request
const getRequest = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Approve a Request
const approveRequest = async (id) => {
  const response = await axios.put(API_URL + id + "/approve");
  return response.data;
};

// Reject a Request
const rejectRequest = async (id) => {
  const response = await axios.put(API_URL + id + "/reject");
  return response.data;
};

// Update a Request
const updateRequest = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Get all User Requests
const getUserRequests = async (id) => {
  const response = await axios.get(USER_URL + id);
  return response.data;
};

// Get all User Requests for Admin
const getAllUserRequests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// delete request
const deleteRequest = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createRequest,
  getRequest,
  approveRequest,
  rejectRequest,
  updateRequest,
  getUserRequests,
  getAllUserRequests,
  deleteRequest,
};

export default productService;