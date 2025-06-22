import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [counts, setCounts] = useState({
    projects: 0,
    team: 0,
    clients: 0,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Decode token to get user info
  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchStats();
      fetchTodos();
    } catch (err) {
      console.error('Invalid token');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, []);

  const fetchStats = async () => {
    try {
      const [resProjects, resTeam, resClients] = await Promise.all([
        axios.get('http://multi-tenant-saas.onrender.com/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://multi-tenant-saas.onrender.com/api/team', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://multi-tenant-saas.onrender.com/api/clients', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCounts({
        projects: resProjects.data.length,
        team: resTeam.data.length,
        clients: resClients.data.length,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://multi-tenant-saas.onrender.com/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      alert('Error fetching todos');
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://multi-tenant-saas.onrender.com/api/todos',
        { task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      alert('Error creating todo');
    }
  };

  const handleExport = async (type) => {
  try {
    const res = await axios.get(`http://multi-tenant-saas.onrender.com/api/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = JSON.stringify(res.data, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-${user.tenantId}.json`;
    link.click();
  } catch (err) {
    alert(`Error exporting ${type}`);
  }
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="profile-card">
        <h2>Welcome, Admin 👋</h2>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Tenant ID:</strong> {user.tenantId}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>📦 Projects</h3>
          <p>{counts.projects}</p>
        </div>
        <div className="stat-card">
          <h3>👥 Team Members</h3>
          <p>{counts.team}</p>
        </div>
        <div className="stat-card">
          <h3>💼 Clients</h3>
          <p>{counts.clients}</p>
        </div>
      </div>

      <form onSubmit={createTodo} className="form">
        <input
          type="text"
          required
          placeholder="Enter new todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
<div className="export-buttons">
  <button onClick={() => handleExport('projects')}>⬇️ Export Projects</button>
  <button onClick={() => handleExport('clients')}>⬇️ Export Clients</button>
  <button onClick={() => handleExport('team')}>⬇️ Export Team</button>
</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
