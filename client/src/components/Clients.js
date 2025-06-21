import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching clients');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/clients',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClients([...clients, res.data]);
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      alert('Error creating client');
    }
  };

  return (
    <div className="container">
      <h2>💼 Clients</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">Add Client</button>
      </form>

      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            <strong>{client.name}</strong> — {client.email} — {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
