import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">

      <Link to="/flags">🔘 Flags</Link>

      <Link to="/environments">🔘 Environments</Link>

      <Link to="/audit">🔘 Audit Log</Link>

      <a href="#">🔘 Settings</a>

    </div>
  );
}

export default Navbar;