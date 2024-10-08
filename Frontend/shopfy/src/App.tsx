import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarTop from "./components/NavBarTop";

const App = () => {
  return (
    <Router>
      <NavBarTop />
      <NavBar />
      <Routes></Routes>
    </Router>
  );
};

export default App;
