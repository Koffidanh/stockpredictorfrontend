import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loggin from "./Components/Loggin/index";
import Signup from "./Components/Signup/index";
import Dashboard from "./Components/Dashboard/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loggin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
