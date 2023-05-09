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
import ClassPage from './pages/classes/class-page/class'
import ClassSearch from './pages/classes/class-search/class-search'
import AddClass from './pages/classes/class-add/class-add'
import MajorPage from './pages/majors/major-page/major-page'
import EditMajor from './pages/majors/major-edit/major-edit'
import EditProgram from './pages/majors/program-edit/program-edit'
import Enrollments from './pages/enrollments/enrollment-page.jsx/enrollment-page'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<NavBar />}>
          <Route index element={<StudentPage />} />
          {/* This is where all the links go for navigation in the website */}
          <Route path="students" element={<StudentPage />}>
            {/* This is where all the submenu navigation goes */}
            <Route index element={<StudentSearch />} />
            <Route path="search" element={<StudentSearch />} />
            <Route path="add" element={<AddStudent />} />
            <Route path="archived" element={<ArchivedStudents />} />
            <Route path="lost" element={<LostStudents />} />
          </Route>
          <Route path="class" element={<ClassPage />}>
            {/* This is where all the class sub menus go */}
            <Route index element={<ClassSearch />} />
            <Route path="add" element={<AddClass />} />
          </Route>
          <Route path="major" element={<MajorPage />}>
            <Route index element={<EditMajor />} />
            <Route path="program" element={<EditProgram />} />
          </Route>
          <Route path="enrollments" element={<Enrollments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
