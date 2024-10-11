// // src/App.js

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Loggin from "./Components/Loggin/index";
// import Signup from "./Components/Signup/index";
// import Dashboard from "./Components/Dashboard/index";
// import { AuthProvider } from "./Contexts/AuthContext";
// import PrivateRoute from "./Components/PrivateRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Loggin />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loggin from "./Components/Loggin/index";
import Signup from "./Components/Signup/index";
import Dashboard from "./Components/Dashboard/index";
import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import { GlobalProvider } from "./Contexts/GlobalContext";
import Profiles from "./Components/Pages/Profiles";

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<Loggin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profiles />} />
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
