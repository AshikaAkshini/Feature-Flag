import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">
      <Link to="/flags" className="nav-item">
        🔘 Flags
      </Link>

      <Link to="/environments" className="nav-item">
        🔘 Environments
      </Link>

      <Link to="/audit" className="nav-item">
        🔘 Audit Log
      </Link>
      <Link to="/settings" className="nav-item">
        🔘 Teams
      </Link>

      <Link to="/settings" className="nav-item">
        🔘 Settings
      </Link>
    </div>
  );
}

export default Navbar;