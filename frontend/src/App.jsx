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
import AddMajor from './pages/majors/major-add/major-add'
import AddProgram from './pages/majors/program-add/program-add'
import AddUser from './pages/admin/add-user/userAdd'
import SearchUser from './pages/admin/searchUser/userSearch'
import AdminPage from './pages/admin/adminPage/admin'
import Help from './pages/help/help'

function App() {
  return (
    <div className="container">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />
        {/* Main Layout with Navigation */}
        <Route path="/home" element={<NavBar />}>
          <Route index element={<StudentPage />} />
          {/* Student Routes */}
          <Route path="students" element={<StudentPage />}>
            <Route index element={<StudentSearch />} />
            <Route path="search" element={<StudentSearch />} />
            <Route path="add" element={<AddStudent />} />
            <Route path="archived" element={<ArchivedStudents />} />
            <Route path="lost" element={<LostStudents />} />
          </Route>
          {/* Class Routes */}
          <Route path="class" element={<ClassPage />}>
            <Route index element={<ClassSearch />} />
            <Route path="search" element={<ClassSearch />} />
            <Route path="add" element={<AddClass />} />
          </Route>
          {/* Major Routes */}
          <Route path="major" element={<MajorPage />}>
            <Route index element={<EditMajor />} />
            <Route path="eMajor" element={<EditMajor />} />
            <Route path="eProgram" element={<EditProgram />} />
            <Route path="addMajor" element={<AddMajor />} />
            <Route path="addprogram" element={<AddProgram />} />
          </Route>
          {/* Enrollments Route */}
          <Route path="enrollments" element={<Enrollments />} />
          {/* Admin Routes */}
          <Route path="admin" element={<AdminPage />}>
            <Route index element={<AdminPage />} />
            <Route path="search" element={<SearchUser />} />
            <Route path="add" element={<AddUser />} />
          </Route>
          {/* Help Route */}
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
