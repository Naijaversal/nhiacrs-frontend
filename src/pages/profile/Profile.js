import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./Profile.scss";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting use");
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
    <h3>Edit Profile</h3>
      {isLoading && <Loader />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-data">
              <p className="--mb">
                <h5 className="--mb">Name : </h5> {profile?.name}
              </p>
              <p className="--mb">
                <h5 className="--mb">Email : </h5> {profile?.email}
              </p>
              <p className="--mb">
                <h5 className="--mb">Phone : </h5> {profile?.phone}
              </p>
              <p className="--mb">
                <h5 className="--mb">Designation: </h5> {profile?.designation}
              </p>
              <p className="--mb">
                <h5 className="--mb">Role: </h5> {profile?.role}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
