import { useEffect, useState } from "react";
import {ConfirmationButton} from "../../Buttons/Button";
import { title } from "process";
import { ToggleButton } from "../../Buttons/Button";
import LoadingCircle from "../../Buttons/LoadingCircle";

interface WelcomeModalProps {
    onClose(): any,
    username: string,
    description: string
}
const welcome: String = "Welcome!"
const welcomeMessage: String = "Glad you are here. It looks like this is your first visit to BonBot. You can have the bot connect to your chat right here. If not you can just close the modal.You can enable/disable the bot connection later at any time."

const WelcomeModal = ({ onClose, username, description }: WelcomeModalProps) => {
  const [botConnected, setBotConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const onChangeHandler = (shouldBeConnected: any) =>{
    setBotConnected(shouldBeConnected as boolean)
  }

 const submitUser = async () =>{
      setIsLoading(true)
      const newUser = {
        username: username,
          description: description,
          isBotConnected: botConnected,
          isAdmin: true, //TODO change before release
      }
      console.log(newUser)
      const res = await fetch("/api/user/create",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      if(res.status != 200){
        console.log("something went wrong")
      }else{
        setIsLoading(false)
        onClose();
      }
     
 }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-75 bg-black">
      <div className="bg-white rounded-lg p-5 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 p-5">{welcome}</h2>
        <p className="mb-4 break-normal pl-5 pt-0">
          {welcomeMessage}
        </p>
        <div className="flex items-center mb-4 pl-5">
          <span className="mr-2">Connect Bot:</span>
       <ToggleButton onChange={onChangeHandler}/>
        </div>
       
        <div className="flex justify-end">
        {isLoading ? (
              <ConfirmationButton title={"confirm"} isLoading={true} onConfirm={submitUser} />
          ) : (
            <ConfirmationButton title={"confirm"} isLoading={false} onConfirm={submitUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;