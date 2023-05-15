import React, { Fragment, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import './login-page.styles.scss'

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL

  //Check if a cookie exists

  //if not do this
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeUser, setActiveUser] = useState(true)
  const [loggedIn, setLogged] = useState(false)
  const checkUser = (user, pass) => {
    axios
      .post(api_url + 'User.php', {
        request: 'getUser',
        login: user,
        password: pass
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem('superUser', res.data[0]['superuser'] == 'Yes')
          localStorage.setItem('userId', res.data[0]['id'])
          // set the cookies with a 1 day expiry
          setLogged(true) //changes screens
        } else {
          setActiveUser(false)
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('It is simply, and indeed quite undeniably...fucked')
      })
  }
  //check if cookies are set

  // if they are set then call check user on the username and password that is set

  const handleLogin = () => {
    checkUser(username, password)
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
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="password-contianer login-box">
          <label className="password-label login-label">Password</label>
          <input
            className="password-field"
            placeholder="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="login-button-container">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          {!activeUser && (
            <p style={{ color: 'red', textEmphasis: 'bold' }}>
              Incorrect username or password
            </p>
          )}
          {loggedIn && <Navigate to="/home/students/search" replace={true} />}
        </div>
      </div>
    </div>
  )
}

export default Login
