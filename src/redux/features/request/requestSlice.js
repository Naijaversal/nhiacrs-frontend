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
  totalUserRequest: 0,
  totalApprovedRequest: 0,
  totalRejectedRequest: 0,
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
      return thunkAPI.rejectWithValue(message);
      
      
    }
  }
);

// Get all requests
export const getRequests = createAsyncThunk(
  "requests/getAll",
  async (_, thunkAPI) => {
    try {
      return await requestService.getRequests();
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
  async (id, thunkAPI) => {
    try {
      return await requestService.deleteRequest(id);
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

// Get a request
export const getRequest = createAsyncThunk(
  "requests/getRequest",
  async (id, thunkAPI) => {
    try {
      return await requestService.getRequest(id);
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

// Update Request
export const updateRequest = createAsyncThunk(
  "requests/updateRequest",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await requestService.updateRequest(id, formData);
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

// Approve Request
export const approveRequest = createAsyncThunk(
  "requests/approveRequest",
  async (id, thunkAPI) => {
    try {
      return await requestService.approveRequest(id);
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
// Reject Request
export const rejectRequest = createAsyncThunk(
    "requests/rejectRequest",
    async (id, thunkAPI) => {
      try {
        return await requestService.rejectRequest(id);
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
    reducers: {
      CALC_USER_REQUESTS(state, action) {
        const requests = action.payload;
        const userRequestCount = requests.reduce((accumulator, request) => {
          if (request.user_id === state.user.id) {
            accumulator++;
          }
          return accumulator;
        }, 0);
        state.totalUserRequest = userRequestCount;
      },
      CALC_APPROVED_REQUESTS(state, action) {
        const requests = action.payload;
        const approvedRequestCount = requests.reduce((accumulator, request) => {
          if (request.user_id === state.user.id && request.status === "approved") {
            accumulator++;
          }
          return accumulator;
        }, 0);
        state.totalApprovedRequest = approvedRequestCount;
      },
      
      CALC_REJECTED_REQUESST(state, action){
        const requests = action.payload;
        const rejectedRequestCount = requests.reduce((accumulator, request) => {
          if (request.user_id === state.user.id && request.status === "rejected") {
            accumulator++;
          }
          return accumulator;
        }, 0);
        state.totalRejectedRequest = rejectedRequestCount;
      }, 
    },
    extraReducers: (builder) => {
      builder
        .addCase(createRequest.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createRequest.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.requests.push(action.payload);
          toast.success("Request Sent");
        })
        .addCase(createRequest.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getRequests.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getRequests.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.requests = action.payload;
        })
        .addCase(getRequests.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(deleteRequest.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const requests = state.requests.filter((request) => request.id !== action.payload.id);
            state.requests = requests;
            toast.success("Request deleted successfully");
          })
          .addCase(deleteRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
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
          })
          .addCase(approveRequest.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(approveRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Request Approved");
            const requests = state.requests.map((request) => {
              if (request.id === action.payload.id) {
                request.status = "approved";
              }
              return request;
            });
            state.requests = requests;
          })
          .addCase(approveRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(rejectRequest.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(rejectRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Request Rejected");
            const requests = state.requests.map((request) => {
              if (request.id === action.payload.id) {
                request.status = "rejected";
              }
              return request;
            });
            state.requests = requests;
          })
          .addCase(rejectRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          
        },
      },
    );

    export const { CALC_USER_REQUESTS, CALC_APPROVED_REQUESTS, CALC_REJECTED_REQUESST} =
 requestSlice.actions;

export const selectIsLoading = (state) => state.request.isLoading;
export const selectRequest = (state) => state.request.request;
export const selectTotalRequests = (state) => state.request.totalUserRequest;
export const selectApprovedRequests = (state) => state.request.totalApprovedRequest;
export const selectRejectedRequests = (state) => state.request.totalRejectedRequest;


export default requestSlice.reducer;
