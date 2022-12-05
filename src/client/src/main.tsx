import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
         <>
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<App/>}/>
        <Route  path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
      </>
  </React.StrictMode>
)
