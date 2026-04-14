import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Admin/Dashboard'
import Analytics from './components/Admin/Analytics'
import AdminNavbar from './components/Admin/AdminNavbar'
import Chat from './components/Student/Chat'
import { useEffect } from 'react';
import { testFirestore } from './Auth/test';
import SelectCollege from './components/SelectCollege'
import Landing from "./Landing";
import VerifyEmailNotice from './components/Admin/VerifyEmailNotice'



function AppContent() {
  const location = useLocation();
  const isAdminPage = ['/dashboard', '/analytics'].includes(location.pathname);
  
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/select-college" element={<SelectCollege />} />
        <Route path="/verify-email" element={<VerifyEmailNotice />} />
      </Routes>
    </>
  )
}

function App() {


  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
