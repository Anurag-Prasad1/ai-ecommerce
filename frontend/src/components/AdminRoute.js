import { useContext } from "react";

import {
  Navigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { userInfo } =
    useContext(AuthContext);

  if (
    !userInfo ||
    !userInfo.user?.isAdmin
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;