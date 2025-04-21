import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/map');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 border rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Signup</h1>
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white w-full py-2" onClick={handleSignup}>Signup</button>
        <p className="text-sm text-center text-gray-500">Already have an account? <a href="/" className="underline">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
