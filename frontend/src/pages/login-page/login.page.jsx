import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './login-page.styles.scss'

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-username-container">
          <label className="username-label">Username</label>
          <input
            placeholder="username"
            className="username-field"
            type="text"
          />
        </div>
        <div className="password-contianer">
          <label className="password-label">Password</label>
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
