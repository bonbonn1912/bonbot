import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Button from "../Buttons/Button";
import { LoginButtonStyle } from "../Styles";
import { authenticateUser } from "../../Functions/authUser";
import LoadingCircle from "../Buttons/LoadingCircle";

export const Home = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const twitchAuthUrl = `http://${window.location.host}/auth/twitch`;
    useEffect(() =>{
      authenticateUser().then((user) =>{
        console.log("Set user from home.tsx")
        setAuth(user);
        setLoading(false);
      }).catch((err) =>{
        console.log("user not auth in home.tsx")
        setAuth(null)
        setLoading(false);
      })
    },[])
    if(loading){
      return <LoadingCircle/>
    }else if(!loading && auth != null){
      console.log("go to dashboard")
      return <Navigate to="/dashboard" replace />;
    
    }else{
      return (
        <>
            <h1 className="text-5xl font-bold underline bg-slate-400">
        Welcome to Bonbot
        </h1>
        <Button href={twitchAuthUrl} titel="Login with twitch" buttonStyle={LoginButtonStyle}></Button>
        </>
    
    )
    }
    return null
    
}