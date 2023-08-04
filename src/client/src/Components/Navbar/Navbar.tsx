import Button from "../Buttons/Button"
import { AuthContext } from "../../context/AuthProvider";
import { LogoutButtonStyle } from "../Styles";

export const Navbar = () => {
    const logoutUrl = `http://${window.location.host}/logout`;
    return (<div id="sidebar" className="w-full h-14 bg-slate-600 flex items-center justify-end">
             <Button href={logoutUrl} titel="Logout" buttonStyle={LogoutButtonStyle}></Button>
    </div>)
        
}