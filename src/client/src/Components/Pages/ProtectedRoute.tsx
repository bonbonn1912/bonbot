import { Component, useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { authenticateUser } from "../../Functions/authUser";
import LoadingCircle from "../Buttons/LoadingCircle";


interface props {
  children: React.ReactElement
}

const ProtectedRoute = (props: props) => {
  const { auth, setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
      authenticateUser().then((user) =>{
        setAuth(user);
        setLoading(false);
      }).catch((err) =>{
        setAuth(null)
        setLoading(false);
      })
  
  },[])
    if(loading){
      return <LoadingCircle/>
    }
    if (auth == null) {
      return <Navigate to="/home" replace />;
    }
    return props.children;
  };

export default ProtectedRoute;
  