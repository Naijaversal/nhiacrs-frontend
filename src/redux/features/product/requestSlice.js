import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "./requestService";
import { toast } from "react-toastify";

const initialState = {
  request: null,
  requests: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Request
export const createRequest = createAsyncThunk(
  "requests/create",
  async (formData, thunkAPI) => {
    try {
      return await requestService.createRequest(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve a Request
export const approveRequest = createAsyncThunk(
  "requests/approve",
  async (requestId, thunkAPI) => {
    try {
      return await requestService.approveRequest(requestId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reject a Request
export const rejectRequest = createAsyncThunk(
  "requests/reject",
  async (requestId, thunkAPI) => {
    try {
      return await requestService.rejectRequest(requestId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Get All Requests
export const getAllRequests = createAsyncThunk(
  "requests/getAll",
  async (_, thunkAPI) => {
    try {
      return await requestService.getAllRequests();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Request
export const getRequest = createAsyncThunk(
  "requests/getOne",
  async (requestId, thunkAPI) => {
    try {
      return await requestService.getRequest(requestId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Request
export const deleteRequest = createAsyncThunk(
  "requests/delete",
  async (requestId, thunkAPI) => {
    try {
      return await requestService.deleteRequest(requestId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.requests.push(action.payload);
        toast.success(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(approveRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(rejectRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
        .addCase(getAllRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.requests = action.payload;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.request = action.payload;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        state.request = null;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});


export const selectIsLoading = (state) => state.request.isLoading;
export const selectRequest = (state) => state.request.request;
export const selectRequests = (state) => state.request.requests;

export default requestSlice.reducer;

