interface LoginButtonProps {
  href: string;
  titel: string;
  buttonStyle?: string;
}

interface ConfirmButtonProps {
  title: string;
  onConfirm(): void;
  isLoading: boolean,
}

interface ToggleButtonProps {
  onChange: React.Dispatch<SetStateAction<boolean>>;
  initialValue: boolean,
}

export const ToggleButton = ({ onChange, initialValue }: ToggleButtonProps) => {
  const [toggle, setToggle] = useState(initialValue);
  const toggleClass = "transform translate-x-5";
  const activeBgColor = "bg-gray-400"; 
  const inactiveBgColor = "bg-green-400"; 
  return (
    <div
      className={`md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        toggle ? activeBgColor : inactiveBgColor
      }`} 
      onClick={() => {
        setToggle(!toggle);
        onChange(!toggle); 
      }}
    >
      <div
        className={`bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out ${
          !toggle ? toggleClass : ""
        }`} 
      ></div>
    </div>
  );
};
const Button: React.FC<LoginButtonProps> = ({ href, titel, buttonStyle }) => {
  return (
    <a href={href} className="mr-3">
      <button className={buttonStyle}>{titel}</button>
    </a>
  );
};

import { SetStateAction, useState } from "react";
import Spinner from "./Spinner";
import LoadingCircle from "./LoadingCircle";
export const ConfirmationButton = ({
  title,
  onConfirm,
  isLoading,
}: ConfirmButtonProps) => {

  return (
    <button
      onClick={onConfirm}
      className={`py-2 px-4 rounded-md ${
        isLoading
          ? 'bg-green-500 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600'
      } text-white relative`}
      disabled={isLoading}
    >
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner width={8} height={8}/>
        </div>
      )}
      {isLoading ? <div className="opacity-0">Loading</div> : 'Confirm'}
    </button>
  );
};

export default Button;
