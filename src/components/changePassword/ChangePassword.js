import React, { useState } from "react";
import "./ChangePassword.scss";

import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setShowPassword(checked);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("New passwords do not match");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data);
    navigate("/profile");
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h4 className="--center-all">Change Password</h4>
        <form onSubmit={changePass} className="--form-control">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <div className="show-password-checkbox">
            <input
              type="checkbox"
              id="passwordCheckbox"
              checked={showPassword}
              onChange={handleInputChange}
            />
            <label htmlFor="passwordCheckbox"><p>Show Password</p></label>
          </div>
          <button type="submit" className="--btn --btn-success edit-pro-width-40 ">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
