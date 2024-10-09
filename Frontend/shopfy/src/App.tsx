import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarTop from "./components/NavBarTop";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <NavBarTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
