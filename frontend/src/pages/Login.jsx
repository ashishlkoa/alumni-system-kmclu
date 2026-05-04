import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    try {
      // Backend API ko data bhej rahe hain
      const response = await axios.post('https://alumni-system-kmclu.onrender.com', {
        email,
        password
      });

      // Agar login successful hua, toh token aur role ko browser mein save kar lenge
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);

      // Role ke hisaab se Dashboard par bhejenge
      if (response.data.role === 'superadmin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/alumni-dashboard');
      }
      
    } catch (err) {
      setError('Invalid Email or Password');
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '10px', width: '350px' }}>
        <h2 style={{ textAlign: 'center' }}>Alumni Portal Login</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Email:</label><br />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div>
            <label>Password:</label><br />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Login
          </button>
          
        </form>
        
      </div>
      
    </div>
    
  );
};

export default Login;