import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './login-page.styles.scss'

const Login = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">WebVisor</h1>
      <div className="login-container">
        <div className="login-username-container login-box">
          <label className="username-label login-label">Username</label>
          <input
            placeholder="username"
            className="username-field"
            type="text"
          />
        </div>
        <div className="password-contianer login-box">
          <label className="password-label login-label">Password</label>
          <input
            className="password-field"
            placeholder="password"
            type="password"
          />
        </div>
        <div className="login-button-container">
          <Link to="/home">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
