import { useEffect, useState } from "react";

function Environments() {
  const [environments, setEnvironments] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("");

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
  }, []);

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
    </div>
  );
}

export default Environments;