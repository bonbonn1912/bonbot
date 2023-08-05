import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import  Button  from '../Buttons/Button'
import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";
import { Command } from "./Command/Command";


export const Dashboard = () => {
  console.log("load dashboard");
    return (
      <div className="flex h-screen">
      <Sidebar/>
      <div className="w-screen">
      <Command/>
      </div>
      </div>  
    )
}