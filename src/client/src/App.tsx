import { BrowserRouter as Router, Routes, Route, Link, redirect, Navigate, useNavigate } from 'react-router-dom'
import { Home } from './Components/Pages/Home'
import { Dashboard } from './Components/Pages/Dashboard'
import RouteWrapper from './Components/Pages/RouteWrapper'
function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RouteWrapper
              isAuthenticatedElement={<Dashboard />}
              alternativeElement={<Navigate to="/" replace />}
            />
          }
        />
        <Route path="/*" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
