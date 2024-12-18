import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeManagementApp from './components/EmployeeManagementApp';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="employee" />} />
          <Route path='/employee' element={<EmployeeManagementApp />} />
          <Route path='/employee/:id' element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;