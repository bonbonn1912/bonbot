import Button from "../Buttons/Button";
import { LoginButtonStyle } from "../Styles";

export const Home = () => {
    const twitchAuthUrl = `http://${window.location.host}/auth/twitch`;
      return (
        <>
            <h1 className="text-5xl font-bold underline bg-slate-400">
        Welcome to Bonbot
        </h1>
        <Button href={twitchAuthUrl} titel="Login with twitch" buttonStyle={LoginButtonStyle}></Button>
        </>  
    )  
}