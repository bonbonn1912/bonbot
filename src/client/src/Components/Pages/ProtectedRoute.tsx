import { Component, useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

interface props {
  children: React.ReactElement
}

const ProtectedRoute = (props: props) => {
  const { auth } = useContext(AuthContext);
    if (auth == null) {
      return <Navigate to="/home" replace />;
    }
    return props.children;
  };

export default ProtectedRoute;
  