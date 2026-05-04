import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlumniDashboard = () => {
  const [profile, setProfile] = useState(null);
  
  // Forms ke liye state
  const [frequentData, setFrequentData] = useState({ contactNumber: '', workingCity: '', salary: '' });
  const [basicData, setBasicData] = useState({ company: '', passoutYear: '' });
  
  // Messages dikhane ke liye
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Profile Fetch Karna
  const fetchProfile = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('https://alumni-system-kmclu.onrender.com', {
        headers: { 'x-auth-token': token }
      });
      setProfile(response.data);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 1. Frequent Info Update Function
  const handleFrequentUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/alumni/update-frequent', frequentData, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Frequent Info updated successfully!');
      setFrequentData({ contactNumber: '', workingCity: '', salary: '' }); // Form clear karna
      fetchProfile(); // Naya data dikhane ke liye profile refresh karna
      
      setTimeout(() => setMessage(''), 3000); // 3 second baad message hata dena
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  // 2. Basic Info Request Function
  const handleBasicRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/alumni/request-basic-update', basicData, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Request submitted to Super Admin for approval!');
      setBasicData({ company: '', passoutYear: '' }); // Form clear karna
      
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Error submitting request');
    }
  };

  if (!profile) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Profile...</h2>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Alumni Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>
      
      {/* Success Message */}
      {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>{message}</div>}
      
      {/* Profile Details */}
      <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #ddd' }}>
        <h3 style={{ marginTop: '0' }}>Welcome, {profile.name}!</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <p><strong>Email ID:</strong> {profile.email}</p>
          <p><strong>Company:</strong> {profile.company || 'N/A'}</p>
          <p><strong>Passout Year:</strong> {profile.passoutYear || 'N/A'}</p>
          <p><strong>Contact:</strong> {profile.contactNumber || 'N/A'}</p>
          <p><strong>City:</strong> {profile.workingCity || 'N/A'}</p>
          <p><strong>Salary:</strong> {profile.salary ? `₹${profile.salary}` : 'N/A'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* Form 1: Frequent Updates */}
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h4>Update Frequent Info (Direct)</h4>
          <form onSubmit={handleFrequentUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="New Contact Number" value={frequentData.contactNumber} onChange={(e) => setFrequentData({...frequentData, contactNumber: e.target.value})} style={{ padding: '8px' }} />
            <input type="text" placeholder="New Working City" value={frequentData.workingCity} onChange={(e) => setFrequentData({...frequentData, workingCity: e.target.value})} style={{ padding: '8px' }} />
            <input type="number" placeholder="New Salary" value={frequentData.salary} onChange={(e) => setFrequentData({...frequentData, salary: e.target.value})} style={{ padding: '8px' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Update Instantly</button>
          </form>
        </div>

        {/* Form 2: Basic Info Request */}
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fffdf5' }}>
          <h4>Request Basic Info Update</h4>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '-10px' }}>Requires Super Admin Approval</p>
          <form onSubmit={handleBasicRequest} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="New Company Name" value={basicData.company} onChange={(e) => setBasicData({...basicData, company: e.target.value})} style={{ padding: '8px' }} />
            <input type="number" placeholder="New Passout Year" value={basicData.passoutYear} onChange={(e) => setBasicData({...basicData, passoutYear: e.target.value})} style={{ padding: '8px' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#ffc107', color: '#333', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Submit Request</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default AlumniDashboard;