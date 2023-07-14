import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    designation: user?.designation,
    role: user?.role,
  };
  const [profile, setProfile] = useState(initialState);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };


  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      
        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          designation: profile.designation,
          role: profile.role,
              };

        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      }
     catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <h3>Edit Profile</h3>
      <Card cardClass={"card --flex-dir-column"}>

        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p className="edit-p">
              <h5 className="edit-p">Name:</h5>
              <input className="edit-p"
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p className="edit-p">
            <h5 className="edit-p">Email:</h5>
              <input type="text" name="email" value={profile?.email} disabled className="edit-p"/>
             
              <code className="marg-t" >Email cannot be changed.</code>
            </p>
            <p className="edit-p">
              <h5 className="edit-p">Phone:</h5>
              <input className="edit-p"
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p className="edit-p">
              <h5 className="edit-p">Designation:</h5>
              <input className="edit-p"
                type="text"
                name="designation"
                value={profile?.designation}
                onChange={handleInputChange}
              />
            </p>
            <p className="edit-p">
            <h5 className="edit-p">Role:</h5>
              <input className="edit-p"
                type="text"
                name="role"
                value={profile?.role}
                onChange={handleInputChange}
              />
            </p>
          </span>
          <button className="--btn edit-pro-width-40 --btn-success">Save Changes
              </button>
        </form>
      </Card>
      <br />
      <ChangePassword />

      <div>
      
            </div>
    </div>
  );
};

export default EditProfile;
