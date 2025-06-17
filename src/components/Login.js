import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
const Login = () => {
  return (
<div className="container">        <h2>Login</h2>
        <form className='form'>
        <input type="email" required placeholder='enter your emial'/>
        <input type="password"  required placeholder='enter your password'/>
        <button type="submit">Login </button>
        </form>
        <p>dont have an account? <Link to="/signup">Singup here</Link></p>
    </div>
  )
}

export default Login;