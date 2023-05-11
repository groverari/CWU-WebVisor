import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import './login-page.styles.scss'

const Login = () => {
  //Check if a cookie exists

  //if not do this
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (value) => {
    console.log(value)
  }
  return (
    <div className="login-page">
      <h1 className="login-title">WebVisor</h1>
      <div className="login-container">
        <div className="login-username-container login-box">
          <label className="username-label login-label">Username</label>
          <input
            placeholder="Username"
            className="username-field"
            type="text"
            onChange={usernameHandler}
          />
        </div>
        <div className="password-contianer login-box">
          <label className="password-label login-label">Password</label>
          <input
            className="password-field"
            placeholder="Password"
            type="password"
            onChange={usernameHandler}
          />
        </div>
        <div className="login-button-container">
          <Link to="/home/students/search">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
