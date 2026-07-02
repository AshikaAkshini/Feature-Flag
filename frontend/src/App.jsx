import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Flags from "./pages/Flags";
import Environments from "./pages/Environments";
import AuditLog from "./pages/AuditLog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/flags" />} />
        <Route path="/flags" element={<Flags />} />
        <Route path="/environments" element={<Environments />} />
        <Route path="/audit" element={<AuditLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;