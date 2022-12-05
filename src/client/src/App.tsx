import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const App = () => {
  const [count, setCount] = useState(0);
  const testApi = (path: string) => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      fetch("/isauth")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.msg){
          setIsLoggedIn(true)
          navigate("/Dashboard")
        }else{
          navigate("ERROR")
        }
      });
    };
    checkLogin();
  }, []);
  return (
    <div>
      <button onClick={() => testApi("/api")}>Test Api</button>
      <button onClick={() => testApi("/api/nested")}>Test Nested</button>
      <button>Dashboard</button>
    </div>
  );
};

export default App;
