import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dhyan dein: Yahan hum explicitly role 'alumni' bhej rahe hain
      const response = await axios.post('https://alumni-system-kmclu.onrender.com', { 
        ...formData, 
        role: 'alumni' 
      });
      
      alert("Registration Successful! Aap ab login kar sakte hain.");
      navigate('/login'); // Register hote hi wapas login par bhej dega
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed! Email already exists.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Alumni Registration</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          
          <input 
            type="text" name="name" placeholder="Full Name" required 
            value={formData.name} onChange={handleChange}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          <input 
            type="email" name="email" placeholder="Email Address" required 
            value={formData.email} onChange={handleChange}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          <input 
            type="password" name="password" placeholder="Password" required 
            value={formData.password} onChange={handleChange}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
            Register
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;