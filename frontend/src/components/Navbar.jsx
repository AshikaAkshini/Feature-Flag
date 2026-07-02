import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h2>Feature Flag Dashboard</h2>

      <p><Link to="/flags">Flags</Link></p>

      <p><Link to="/environments">Environments</Link></p>

      <p><Link to="/audit">Audit Log</Link></p>
    </div>
  );
}

export default Navbar;