import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import  Button  from '../Buttons/Button'


export const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const logoutUrl = `http://${window.location.host}/logout`;
    return (
      <>
        <h1 className="text-5xl font-bold underline bg-slate-400">
        Welcome to your Dashboard {auth.login}
      </h1>
      <Button href={logoutUrl} titel="Logout"></Button>
      </>
      

    )
}