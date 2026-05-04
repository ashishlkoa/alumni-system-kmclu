import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [alumniList, setAlumniList] = useState([]);
  const [filterCity, setFilterCity] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const adminName = localStorage.getItem('name');

  useEffect(() => {
    if (!token || role !== 'superadmin') {
      alert("Access Denied! Only Super Admins can view this page.");
      navigate('/login');
      return;
    }
    fetchPendingRequests();
  }, [navigate, token, role]);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('https://alumni-system-kmclu.onrender.com/api/admin/pending-requests', {
        headers: { 'x-auth-token': token }
      });
      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  const handleRequestAction = async (id, status) => {
    try {
      await axios.put(`https://alumni-system-kmclu.onrender.com/api/admin/handle-request/${id}`, { status }, {
        headers: { 'x-auth-token': token }
      });
      alert(`Request has been ${status}!`);
      fetchPendingRequests(); 
    } catch (err) {
      alert("Error handling request");
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://alumni-system-kmclu.onrender.com/api/admin/filter?workingCity=${filterCity}`, {
        headers: { 'x-auth-token': token }
      });
      setAlumniList(response.data.data);
    } catch (err) {
      console.error("Error filtering alumni", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#343a40', color: 'white', padding: '15px 20px', borderRadius: '8px' }}>
        <h2>Super Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {adminName}</span>
          <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
        
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Pending Profile Updates</h3>
          
          {requests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            requests.map((req) => (
              <div key={req._id} style={{ backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '15px', borderRadius: '5px', borderLeft: '4px solid #ffc107' }}>
                <p><strong>Alumni:</strong> {req.alumniId?.name} ({req.alumniId?.email})</p>
                <p><strong>Requested Changes:</strong></p>
                <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px', fontSize: '14px' }}>
                  {JSON.stringify(req.requestedChanges, null, 2)}
                </pre>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleRequestAction(req._id, 'Approved')} style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Approve</button>
                  <button onClick={() => handleRequestAction(req._id, 'Rejected')} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Reject</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>Alumni Directory & Filters</h3>
          
          <form onSubmit={handleFilter} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Search by Working City (e.g., Bangalore)" 
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Filter</button>
          </form>

          <div>
            <h4>Results: {alumniList.length} Alumni Found</h4>
            {alumniList.map((alumni) => (
              <div key={alumni._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <strong>{alumni.name}</strong> - {alumni.company || 'No Company'} ({alumni.workingCity || 'No City'}) <br/>
                <small>Passout: {alumni.passoutYear || 'N/A'} | Contact: {alumni.contactNumber || 'N/A'}</small>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;