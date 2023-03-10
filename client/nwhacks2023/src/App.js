import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/AuthPages/LoginPage";
import SignUpPage from "./components/AuthPages/SignUpPage";
import DashboardHome from "./components/DashboardPages/DashboardHome";
import DashboardResults from "./components/DashboardPages/DashboardResults";
import DashboardSettings from "./components/DashboardPages/DashboardSettings";
import DashboardUpload from "./components/DashboardPages/DashboardUpload";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/upload" element={<DashboardUpload />} />
        <Route path="/results" element={<DashboardResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/settings" element={<DashboardSettings />} />
      </Routes>
    </div>
  );
}

export default App;
