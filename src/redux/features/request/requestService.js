import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/requests/`;



// Create New Request
const createRequest = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all requests
const getRequests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Request
const deleteRequest = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Request
const getRequest = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Request
const updateRequest = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};
// Approve Request
const approveRequest = async (id) => {
  const response = await axios.post(`${API_URL}${id}/approve`);
  return response.data;
};
// Reject Request
const rejectRequest = async (id) => {
  const response = await axios.post(`${API_URL}${id}/reject`);
  return response.data;
};


const requestService = {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
  updateRequest,
  approveRequest,
  rejectRequest,
};

export default requestService;