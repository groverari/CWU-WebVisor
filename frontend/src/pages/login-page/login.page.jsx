import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './login-page.styles.scss'

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL

  //Check if a cookie exists

  //if not do this
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeUser, setActiveUser] = useState(true);
  const [superUser, setSuperUser] = useState(false);

  const handleLogin = () =>
  {
    axios
      .post(api_url + 'User.php', {
        request: 'getUser',
        login: username,
        password: password
      })
      .then((res) => {
        console.log(res.data)
        console.log("errr... I guess its working")
        //I know its weird as shit to != false, but when res.data can equal 
        //all sorts of shit, its what you gotta do
        if(res.data != false)
        {
          if(res.data[0]['superuser'] == 'Yes')
          {
            setSuperUser(true)
            localStorage.setItem('superUser', true);
          }
          else
          {
            setSuperUser(false)
            localStorage.setItem('superUser', false);
          }
          window.location.href = '/home/students/search'; // Navigate to /home/students/search
        }
        else 
        {
          setActiveUser(false);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log("It is simply, and indeed quite undeniably...fucked")
      })
  }
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
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="password-contianer login-box">
          <label className="password-label login-label">Password</label>
          <input
            className="password-field"
            placeholder="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-button-container">
          <button className="login-button" onClick={handleLogin}>Login</button>
          {!activeUser && (
            <p>Incorrect username or password</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
