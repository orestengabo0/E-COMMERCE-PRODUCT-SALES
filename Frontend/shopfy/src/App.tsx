import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarTop from "./components/NavBarTop";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <NavBarTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
