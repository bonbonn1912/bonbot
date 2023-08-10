import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import Button from '../Buttons/Button';
import { Sidebar } from "../Sidebar/Sidebar";
import WelcomeModal from "./Modals/WelcomeModal";
import { RiMenuFill } from 'react-icons/ri';
import Navbar from "../Navbar/Navbar";
import Admin from "../Admin/Admin";
import Commands from "./Command/Commands";
import Documentation from "../Documentation/Documentation";
import Moderation from "../Moderation/Moderation";


export const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showWelcomeModal, setShowWelcomeModal] = useState(auth.isSetup);
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(auth)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(!showWelcomeModal);
  };

  const mainPageHandler = (name: string) =>{
    setSelectedNavItem(name)
    console.log(name)
  }

  const [selectedNavItem, setSelectedNavItem] = useState("Commands");

  const renderSelectedComponent = (component: string) => {
    switch (component) {
      case "Admin":
        return <Admin/>;
      case "Commands":
        return <Commands />;
      case "Documentation": 
      return <Documentation/>
      case "Moderation":
        return <Moderation/>
    }
  };
  

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
     <Sidebar mainPageHandler={mainPageHandler} showSidebar={showSidebar}/>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navigation Bar */}
       <Navbar onClickHandler={toggleSidebar} isBotConnected={auth.isBotConnected} username={auth.username} profileImageUrl={auth.profileImageUrl}/>

        {/* Main Content Area */}
        <div className="flex-grow bg-gray-100">
        {renderSelectedComponent(selectedNavItem)}
        </div>
      </div>

      {/* Welcome Modal */}
      {!showWelcomeModal && <WelcomeModal username={auth.username} description={auth.description} onClose={handleWelcomeModalClose} />}
    </div>
  );
}
