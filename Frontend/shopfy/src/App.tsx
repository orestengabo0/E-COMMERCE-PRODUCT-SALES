import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
      </Routes>
    </Router>
  )
}

export default App