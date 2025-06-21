import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css'

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Decode token to get user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
const decoded = jwtDecode(token);
      setUser(decoded); // will contain id, tenantId, etc.
    } catch (err) {
      console.error('Invalid token');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/todos', {
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
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/todos',
        { task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      alert('Error creating todo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <div className="profile-card">
        <h2>Welcome, User!</h2>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Tenant ID:</strong> {user.tenantId}</p>
        <button onClick={handleLogout}>Logout</button>
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
