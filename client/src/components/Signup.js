import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        tenantId,
      });

      alert(res.data.message); // e.g. "Registration successful"
      navigate('/'); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="form">
        <input type="text" required placeholder="enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" required placeholder="enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" required placeholder="enter tenant ID" value={tenantId} onChange={(e) => setTenantId(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Signup;
