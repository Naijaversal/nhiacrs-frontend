import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../../services/authService"; 
import { toast } from "react-toastify";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    designation: "",
    role: ""
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.designation = profile.desgnation;
      state.user.role = profile.role;
    },
  },
});

export const fetchUserFromDatabase = () => {
  return async (dispatch) => {
    try {
      const userData = await getUser(); // Fetch user data including the role from the backend
      dispatch(SET_USER(userData)); // Dispatch the SET_USER action with the retrieved user data
    } catch (error) {
      const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    }
  };
};
export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user.role; // Selector for user role

export default authSlice.reducer;
