import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/requests`;

// Create a new request
const createRequest = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Approve a request
async function approveRequest(id) {
  try {
    const response = await axios.patch(`${API_URL}/approve/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Reject a request
const rejectRequest = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/reject/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all requests
const getAllRequests = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a particular request
const getRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a request
const deleteRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const requestService = {
  createRequest,
  approveRequest,
  rejectRequest,
  getAllRequests,
  getRequest,
  deleteRequest,
};

export default requestService;
