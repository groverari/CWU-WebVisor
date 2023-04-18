import React from 'react'
import './App.scss'
import Login from './pages/login-page/login.page'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/navbar'
import StudentPage from './pages/student-page/student-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<NavBar />}>
        {/* This is where all the links go for navigation in the website */}
        <Route path="/students" element={<StudentPage />}>
          {/* This is where all the submenu navigation goes */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
