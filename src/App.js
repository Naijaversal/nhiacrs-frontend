import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import MakeRequest from "./pages/editProduct/MakeRequest";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import TaskDashboard from "./pages/taskDashboard/TaskDashboard";
import AddTask from "./pages/addTask/AddTask";
import TaskDetail from "./components/task/taskDetail/TaskDetail";
import EditTask from "./pages/editTask/EditTask";

import { ShowOnAdmin } from "./components/protect/HiddenLink";
import Contact from "./pages/contact/Contact";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
        limit={1}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/task-dashboard"
          element={
            <Sidebar>
              <Layout>
                <TaskDashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-task"
          element={
            <Sidebar>
              <Layout>
                <AddTask />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/task-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <TaskDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <Sidebar>
              <Layout>
                <EditTask />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
       
       <Route
          path="/make-request/:id"
          element={
            <Sidebar>
              <Layout>
                <MakeRequest />
              </Layout>
            </Sidebar>
          }
        />
       
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
