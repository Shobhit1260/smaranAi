import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RoleSelection from './components/RoleSelection';
import ProfileSetup from './components/ProfileSetup';
import UpdateProfile from './components/UpdateProfile';
import AuthCallback from './components/AuthCallback';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import StudentDashboard from './Pages/Studentdashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/createProfile" element={<ProfileSetup />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
