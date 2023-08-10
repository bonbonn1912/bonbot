import { RiMenuFill } from 'react-icons/ri';
import Button from '../Buttons/Button';
import { LogoutButtonStyle } from '../Styles';
import { useState } from 'react';
import DropDownSelect from './DropDownSelect';

interface NavbarProps {
    onClickHandler: any,
    username: string,
    profileImageUrl: string,
    isBotConnected: boolean,
}



const Navbar = ({onClickHandler, username, profileImageUrl, isBotConnected}: NavbarProps) =>{

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
      setShowSettings(!showSettings);
  };
    const logoutUrl = `http://${window.location.host}/logout`;
    return( <div className="flex justify-end bg-gray-900 p-5 overflow-hidden max-h-16">
    {/* Show Modal Icon */}
    <button
      onClick={onClickHandler}
      className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-lg mr-4 absolute top-4 left-4"
    >
        <div className='hover:bg-gray-800 w-full h-full rounded-lg flex justify-center items-center'>
        <RiMenuFill/>
        </div>
   
    </button>

    {/* Grouped Right Side */}
    <div className="flex items-center">
      {/* Profile Picture */}
      <div onClick={toggleSettings} className='flex items-center bg-gray-900 rounded-lg p-1 hover:bg-gray-800'>
      <div className="w-10 h-10 bg-gray-900 rounded-full mr-2">
      <img src={profileImageUrl} alt="Logo" className="rounded-full"/>;
      </div>

      {/* Username */}
      <span className="text-white mr-4">{username}</span>
      </div>

      {showSettings && (
                    <DropDownSelect username={username} botConnectionState={isBotConnected}/>
                )}
      {/* Logout Button */}
     
    { 
    <a href={logoutUrl}>
    <button
        className="text-white bg-gray-900 rounded-lg p-3 hover:bg-gray-800"
      >
        Logout
    </button> </a>}
    </div>
  </div>)
   
}

export default Navbar