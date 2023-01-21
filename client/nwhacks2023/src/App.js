import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DashboardHome from "./components/DashboardHome";
import DashboardResults from "./components/DashboardResults";
import DashboardUpload from "./components/DashboardUpload";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/upload" element={<DashboardUpload />} />
        <Route path="/results" element={<DashboardResults />} />
      </Routes>
    </div>
  );
}

export default App;
