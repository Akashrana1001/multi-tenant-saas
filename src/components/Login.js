import React from 'react'

const Login = () => {
  return (
    <div>
        <h2>Login</h2>
        <input type="email" required placeholder='enter your emial'/>
        <input type="password"  required placeholder='enter your password'/>
        <button type="submit">Login </button>
    </div>
  )
}

export default Login;