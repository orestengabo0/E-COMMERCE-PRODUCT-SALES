import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarTop from "./components/NavBarTop";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Login from "./pages/Login";

const App = () => {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.800")}>
      <Router>
        <NavBarTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin"></Route>
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
};

export default App;
