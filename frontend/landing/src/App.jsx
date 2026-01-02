import Navbar from "./Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Features from "./components/Features/Features.jsx";
import Guide from "./components/Guide/Guide.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
