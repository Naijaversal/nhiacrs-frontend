import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";
import { toast } from "react-toastify";

const initialState = {
  task: null,
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  taskStatus: {
    toDo: 0,
    done: 0,
    notDone: 0,
  },
};

// Create New Task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (formData, thunkAPI) => {
    // Convert form data to a JavaScript object
    const taskData = {
      title: formData.get("title"),
      startDate: new Date(formData.get("startDate")),
      endDate: new Date(formData.get("endDate")),
      department: formData.get("department"),
      status: formData.get("status"),
      description: formData.get("description"),
    };

    try {
      // Send the JavaScript object as JSON to the server
      return await taskService.createTask(taskData);
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

// Get all tasks
export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      return await taskService.getTasks();
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

// Delete a Task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    console.log("Deleting task with ID:", id); // Add this line to log the task ID
    try {
      return await taskService.deleteTask(id);
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

// Get a task
export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id, thunkAPI) => {
    try {
      return await taskService.getTask(id);
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

// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, formData }, thunkAPI) => {
     
    const taskData = {
      title: formData.get("title"),
      startDate: new Date(formData.get("startDate")),
      endDate: new Date(formData.get("endDate")),
      department: formData.get("department"),
      status: formData.get("status"),
      description: formData.get("description"),
    };
    try {
      return await taskService.updateTask(taskData);
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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    CALC_TASK_STATUS(state, action) {
      const tasks = action.payload.tasks;

       if (!tasks || !tasks.length) {
    return state;
  }
      const toDoCount = tasks.filter((task) => task.status === "To Do").length;
      const doneCount = tasks.filter((task) => task.status === "Done").length;
      const notDoneCount = tasks.filter((task) => task.status === "Not Done").length;

      state.taskStatus = {
        toDo: toDoCount,
        done: doneCount,
        notDone: notDoneCount,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tasks.push(action.payload);
        toast.success("Task added successfully");
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tasks = action.payload; // Replace 
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
         state.message = action.payload;
        toast.success(action.payload)
        
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.task = action.payload;
        toast.success(action.payload);
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.task = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const CALC_TASK_STATUS = taskSlice.actions.CALC_TASK_STATUS;

export const selectIsLoading = (state) => state.task.isLoading;
export const selectTask = (state) => state.task.task;
export const selectTaskStatus = (state) => state.task.taskStatus;
export const selectAllTasks = (state) => state.task.tasks;

export default taskSlice.reducer;