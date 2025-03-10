import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomeAdmin/HomeAdmin'
import Login from './pages/Login/Login'
const App = () => {
  return (
    <>
      <div className='app'>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
