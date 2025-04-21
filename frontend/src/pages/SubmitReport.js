import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitReport = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('https://ipapi.co/json/')
      .then(res => setLocation({ lat: res.data.latitude, lng: res.data.longitude }))
      .catch(() => alert('Location fetch failed'));
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/reports', {
        title, description, lat: location.lat, lng: location.lng
      }, {
        headers: { 'x-auth-token': token }
      });
      alert('Report submitted');
    } catch {
      alert('Submission failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 border rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Submit Report</h1>
        <input className="w-full border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full border p-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button className="bg-purple-600 text-white w-full py-2" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SubmitReport;
