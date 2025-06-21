import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import Projects from './components/Projects';

import TeamManagement from './components/TeamManagement';
import Client from './components/Clients'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/team" element={<TeamManagement />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/clients" element={<Client/>}/>
        </Routes>
    </Router>
  );
}

export default App;
