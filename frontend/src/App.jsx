import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Flags from "./pages/Flags";
import Environments from "./pages/Environments";
import AuditLog from "./pages/AuditLog";
import FlagDetail from "./pages/FlagDetail";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <header className="header">
          <h1>Feature Flag Dashboard</h1>
        </header>

        <div className="main-layout">

          <Navbar />

          <div className="content">

            <Routes>
              <Route path="/" element={<Navigate to="/flags" />} />
              <Route path="/flags" element={<Flags />} />
              <Route path="/environments" element={<Environments />} />
              <Route path="/audit" element={<AuditLog />} />
              <Route path="/flags/:flag_key" element={<FlagDetail />} />
            </Routes>

          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;