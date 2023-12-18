import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './home.jsx'
import Historial from './historial.jsx'

function App() {



  return (
    <>

<BrowserRouter>

      <Routes>
        <Route path='/' exact element={ <Home />}/>
        <Route path='/historial' element={ <Historial />}/>
    </Routes>
</BrowserRouter>
    </>
  )
}

export default App