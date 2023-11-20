import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import taskFilterReducer from "../redux/features/task/taskfilterSlice";
import taskReducer from "../redux/features/task/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    taskFilter: taskFilterReducer,
    task: taskReducer, 
  },
});
