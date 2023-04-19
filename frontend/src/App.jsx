/* eslint-disable space-before-function-paren */
import React from 'react'
import './App.scss'
import Login from './pages/login-page/login.page'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/navbar'
import StudentPage from './pages/students/student-page/student-page'
import StudentSearch from './pages/students/student-search/student-search'
import AddStudent from './pages/students/student-add/student-add'
import ArchivedStudents from './pages/students/students-archived/student-archived'
import LostStudents from './pages/students/student-lost/student-lost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<NavBar />}>
        {/* This is where all the links go for navigation in the website */}
        <Route path="students" element={<StudentPage />}>
          {/* This is where all the submenu navigation goes */}
          <Route path="search" element={<StudentSearch />} />
          <Route path="add" element={<AddStudent />} />
          <Route path="archived" element={<ArchivedStudents />} />
          <Route path="lost" element={<LostStudents />} />
        </Route>
        <Route path = "classes" element = {}>
          {/* This is where all the class sub menus go */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
