import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import  Button  from '../Buttons/Button'
import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";
import { Command } from "./Command/Command";
import WelcomeModal from "./Modals/WelcomeModal";


export const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showWelcomeModal, setShowWelcomeModal] = useState(!auth.isSetup);
  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
  };
    return (
      <div className="flex h-screen">
      <Sidebar/>
      <div className="w-screen">
      <Command/>
      </div>
      {showWelcomeModal && <WelcomeModal username={auth.username} description={auth.description} onClose={handleWelcomeModalClose} />}
      </div>  
    )
  }
  