import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');

  const fetchTeam = async () => {
    try {
      const res = await axios.get('http://multi-tenant-saas.onrender.com/api/team', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeam(res.data);
    } catch (err) {
      console.error('Error fetching team', err);
      alert('Failed to fetch team');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://multi-tenant-saas.onrender.com/api/team',
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Team member added successfully');
      setName('');
      setEmail('');
      setPassword('');
      fetchTeam(); // refresh list
    } catch (err) {
      console.error('Add team error', err);
      alert('Failed to add member');
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="container">
      <h2>Team Management</h2>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Member email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Temporary password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Member</button>
      </form>

      <ul>
        {team.map((member) => (
          <li key={member._id}>
            {member.name} ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;
