import { ToggleButton } from "../Buttons/Button"
import { useState, useContext} from 'react'
import Spinner from "../Buttons/Spinner"
import delay from "../../Functions/mockDelay"
import { AuthContext } from "../../context/AuthProvider"

interface DropDownSelectProps {
    botConnectionState: boolean,
    username: string
}

const DropDownSelect = ({botConnectionState, username} : DropDownSelectProps) =>{
    const { auth, setAuth } = useContext(AuthContext);
    const [connectionState, setConnectionState] = useState(!botConnectionState)
    const [isLoading, setIsLoading] = useState(false)
    const booleanToState: { [key: string]: string } = {
        "true": "Disconnected",
        "false": "Connected"
    }

    const setBotStatus = async () =>{
        setIsLoading(true)
        setConnectionState(!connectionState)
        const botSettings = {
          username: username,
            isBotConnected: connectionState,
            isAdmin: true, //TODO change before release
        }
        console.log(botSettings)
        const res = await fetch("/api/bot/update/state",{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(botSettings)
        })
        if(res.status != 200){
          console.log(connectionState)
          console.log("something went wrong")
        }else{
          setIsLoading(false)
        }
        setIsLoading(false)
        console.log("res")
    }

    const onChangeHandler = (val: any) =>{
     setBotStatus()
    }

    return (
        <div className="bg-gray-900 rounded-lg absolute w-60 h-40 top-17 right-1 drop-shadow-2xl shadow-red-500">
            <div className="grid grid-cols-3 m-3 rounded-lg">
            <div className="pl-1 flex col-span-2 text-white w-full">
                <div className="m-auto">
                Bot:
                </div>
                <div className={`m-auto pl-1 flex w-full ${isLoading ? "justify-center" : "justify-center"}`}>
                {isLoading ? (<div >
                <Spinner width={5} height={5}/>
                </div>) : (<div className="m-auto">
                    {booleanToState[connectionState.toString()]}
                </div>)  }
               
              
                </div>
            </div>
            <div className="pl-1 grid text-white">
                <div className="flex justify-center">
                <ToggleButton initialValue={connectionState} onChange={onChangeHandler}/>
                </div>
            </div>  
            </div>       
</div>
    )
}

export default DropDownSelect