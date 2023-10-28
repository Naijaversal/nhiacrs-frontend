import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredRequests: [],
};

const requestFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_REQUESTS(state, action) {
      const { requests, search } = action.payload;
      const tempRequests = requests.filter(
        (request) =>
          request.name.toLowerCase().includes(search.toLowerCase()) ||
          request.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredRequests = tempRequests;
    },
  },
});

export const { FILTER_REQUESTS } = requestFilterSlice.actions;

export const selectFilteredRequests = (state) => state.filter.filteredRequests;

export default requestFilterSlice.reducer;
