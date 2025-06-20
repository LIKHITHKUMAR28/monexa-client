import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProjectPage from './pages/ProjectPage';
import EditProjectsPage from './pages/EditProjectsPage';


const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
  path="/projects"
  element={isAuthenticated() ? <ProjectPage /> : <Navigate to="/login" />}
/>
<Route
  path="/projects/edit"
  element={isAuthenticated() ? <EditProjectsPage /> : <Navigate to="/login" />}
/>
      </Routes>
    </Router>
  );
}

export default App;
