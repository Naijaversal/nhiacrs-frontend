import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUserRole, fetchUserFromDatabase } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnAdmin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromDatabase()); // Fetch the user data, including the role, from the backend
  }, [dispatch]);

  if (isLoggedIn && userRole === "Admin") {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnUser = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromDatabase()); // Fetch the user data, including the role, from the backend
  }, [dispatch]);

  if (isLoggedIn && userRole === "User" && userRole !== "Admin") {
    return <>{children}</>;
  }
  return null;
};
