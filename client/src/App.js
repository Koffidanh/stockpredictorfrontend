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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Loggin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
