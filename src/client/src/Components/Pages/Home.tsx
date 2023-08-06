import Button from "../Buttons/Button";
import { RiTwitchFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
const LoginButtonStyle = {
  // Define your button styles here
  // For example:
  backgroundColor: "#6441A4",
  color: "#FFFFFF",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export const Home = () => {
  const twitchAuthUrl = `http://${window.location.host}/auth/twitch`;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="flex items-center h-max">
        <h1 className=" flex text-5xl font-bold text-white mb-8">
            <div className="items-center">
            Welcome to Bonbot{" "}
        
        <FaRobot className="inline-block pb-4" size={70} />
     {" "}
            </div>
         
        </h1>
      </div>

      <div style={LoginButtonStyle}>
        <RiTwitchFill className="text-white mr-4 text-3xl" />
        Login with Twitch
      </div>
    </div>
  );
};
