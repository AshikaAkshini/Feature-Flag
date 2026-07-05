import React from "react";

const flags = [
  {
    flag_key: "new_dashboard",
    type: "boolean",
    enabled: true,
    owner_team: "Frontend",
  },
  {
    flag_key: "payment_v2",
    type: "boolean",
    enabled: false,
    owner_team: "Backend",
  },
];

function FlagTable() {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Key</th>
          <th>Type</th>
          <th>Enabled</th>
          <th>Owner Team</th>
        </tr>
      </thead>

      <tbody>
        {flags.map((flag) => (
          <tr key={flag.flag_key}>
            <td>{flag.flag_key}</td>
            <td>{flag.type}</td>
            <td>{flag.enabled ? "Yes" : "No"}</td>
            <td>{flag.owner_team}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FlagTable;