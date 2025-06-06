import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loggin from "./Components/Loggin/index";
import Signup from "./Components/Signup/index";
import Dashboard from "./Components/Dashboard/index";
import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import { GlobalProvider } from "./Contexts/GlobalContext";
import Profiles from "./Components/Pages/Profiles";
import Settings from "./Components/Pages/Settings";
import Delete from "./Components/Pages/Delete";

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<Loggin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/delete" element={<Delete />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
