import { BrowserRouter as Router, Routes, Route, Link, redirect, Navigate } from 'react-router-dom'
import { Home } from './Components/Pages/Home'
import { Dashboard } from './Components/Pages/Dashboard'
import ProtectedRoute from './Components/Pages/ProtectedRoute'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from './context/AuthProvider'
function App() {

  const { auth, setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);


  useEffect(() =>{
    const authenticateUser = async () =>{
      const auth = await fetch("/authenticate");
      console.log("auth done")
      const user = await auth.json();
      return user
    }
    authenticateUser().then((user) =>{
      setAuth(user);
      setLoading(false);
    }).catch((err) =>{
      setAuth(null)
      setLoading(false);
    })
  },[])
//   

  const redirectTo =  () => {
    if(loading){
      return null;
    }else if(auth){
      return <Navigate to="/dashboard" replace={true} />
    }else{
      return <Navigate to="/home" replace={true}/>
    }
   
  }
  return (
    <Router>
      <Routes>
      <Route path="/" element={redirectTo()} />
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
      </Routes>
    </Router>
   
    
  )
}

export default App
