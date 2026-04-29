import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AlumniDashboard from './pages/AlumniDashboard';
import AdminDashboard from './pages/AdminDashboard'; // Humne Asli Admin Dashboard import kar liya hai

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboards */}
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;