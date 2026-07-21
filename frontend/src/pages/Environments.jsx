import { useEffect, useState } from "react";

function Environments() {
  const [environments, setEnvironments] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/environments")
      .then((response) => response.json())
      .then((data) => {
        setEnvironments(data);

        if (data.length > 0) {
          setSelectedEnvironment(data[0].name);
        }
      })
      .catch((error) => console.error(error));

      fetch("http://127.0.0.1:8000/flags/")
  .then((response) => response.json())
  .then((data) => setFlags(data))
  .catch((error) => console.error(error));
  }, []);

  const selectedEnv = environments.find(
  (env) => env.name === selectedEnvironment
);

const filteredFlags = selectedEnv
  ? flags.filter(
      (flag) => flag.environment_id === selectedEnv.id
    )
  : [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Environment Switcher</h1>
      <label>Select Environment:</label>
      <br />
      <br />

      <select
        value={selectedEnvironment}
        onChange={(e) => setSelectedEnvironment(e.target.value)}
      >
        {environments.map((env) => (
          <option key={env.id} value={env.name}>
            {env.name}
          </option>
        ))}
      </select>

      <h3 style={{ marginTop: "20px" }}>
  Current Environment: {selectedEnvironment}
</h3>

<hr />

<h2>Feature Flags</h2>

<table
  border="1"
  cellPadding="10"
  style={{
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
  }}
>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Owner</th>
    </tr>
  </thead>

  <tbody>
    {filteredFlags.length === 0 ? (
      <tr>
        <td colSpan="3" align="center">
          No Flags Found
        </td>
      </tr>
    ) : (
      filteredFlags.map((flag) => (
        <tr key={flag.id}>
          <td>{flag.flag_key}</td>

          <td>
            {flag.enabled ? "🟢 Enabled" : "🔴 Disabled"}
          </td>

          <td>{flag.owner_team}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
    </div>
  );
}

export default Environments;