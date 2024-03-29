import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
        <Route path="/" element={
            <RouteWrapper
              isAuthenticatedElement={<Navigate to="/dashboard" replace />}
              alternativeElement={<Home/>}
            />
          }/>
      </Routes>
    </Router>
  )
}

export default App
