import { useEffect, useState } from "react";

function Flags() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/flags/")
      .then((response) => response.json())
      .then((data) => setFlags(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Feature Flags</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Status</th>
            <th>Owner</th>
          </tr>
        </thead>

        <tbody>
          {flags.map((flag) => (
            <tr key={flag.id}>
              <td>{flag.flag_key}</td>
              <td>{flag.type}</td>
              <td>{flag.enabled ? "Enabled" : "Disabled"}</td>
              <td>{flag.owner_team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Flags;