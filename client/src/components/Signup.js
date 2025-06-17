import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
const Signup = () => {
  return (
    <div className='container'>
    <h2>Signup</h2>

    <form>
        <input type='name' placeholder='enter your Company Name'/><br/>
        <input type="email" placeholder='enter your email'/><br/>
        <input type='password' placeholder='enter your password'/><br/>
        <button type='submit'>Submit</button>
    </form>
    <p>Already have an account ? <Link to="/">Login here</Link> </p>
    </div>
  )
}

export default Signup