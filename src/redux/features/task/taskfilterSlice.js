import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTasks: [],
};

const taskFilterSlice = createSlice({
  name: "taskFilter",
  initialState,
  reducers: {
    FILTER_TASKS(state, action) {
      const { tasks, search } = action.payload;
      const tempTasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.department.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTasks = tempTasks;
    },
  },
});

export const { FILTER_TASKS } = taskFilterSlice.actions;

export const selectFilteredTasks = (state) => state.taskFilter.filteredTasks;

export default taskFilterSlice.reducer;
