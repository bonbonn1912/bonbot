import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Button from "../Buttons/Button";
import { LoginButtonStyle } from "../Styles";

export const Home = () => {
    const { auth } = useContext(AuthContext);
    const twitchAuthUrl = `http://${window.location.host}/auth/twitch`;
   
    if(auth != null){
        return <Navigate to="/dashboard" replace />;
    }

    const handleLoginClick = () => {
        return <Navigate to="/auth/twitch"/>
    }
    return (
        <>
            <h1 className="text-5xl font-bold underline bg-slate-400">
        Welcome to Bonbot
        </h1>
        <Button href={twitchAuthUrl} titel="Login with twitch" buttonStyle={LoginButtonStyle}></Button>
        </>
    
    )
}