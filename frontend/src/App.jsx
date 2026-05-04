import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Nayi line add ki
import AlumniDashboard from './pages/AlumniDashboard';
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Naya Route add kiya */}
        
        {/* Dashboards */}
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;