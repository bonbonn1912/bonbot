import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import Button from '../Buttons/Button';
import { Sidebar } from "../Sidebar/Sidebar";
import { Command } from "./Command/Command";
import WelcomeModal from "./Modals/WelcomeModal";
import { RiMenuFill } from 'react-icons/ri';
import Navbar from "../Sidebar/Navbar";

export const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showWelcomeModal, setShowWelcomeModal] = useState(!auth.isSetup);
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(auth)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
     <Sidebar showSidebar={showSidebar}/>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navigation Bar */}
       <Navbar onClickHandler={toggleSidebar} username={auth.username} profileImageUrl={auth.profileImageUrl}/>

        {/* Main Content Area */}
        <div className="flex-grow bg-gray-100 p-4">
          {/* Hier kann der Inhalt für die Hauptkomponente hinzugefügt werden */}
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && <WelcomeModal username={auth.username} description={auth.description} onClose={handleWelcomeModalClose} />}
    </div>
  );
}
