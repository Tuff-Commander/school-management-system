import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the Admin Dashboard */}
        <Route
          path="/admin"
          element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;