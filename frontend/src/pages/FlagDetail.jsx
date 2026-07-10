import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlagById } from "../api/FlagApi";

function FlagDetail() {
  const { flag_key } = useParams();
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    getFlagById(flag_key)
      .then((data) => setFlag(data))
      .catch((err) => console.error(err));
  }, [flag_key]);

  if (!flag) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="flag-detail">
      <h2>Flag: {flag.flag_key}</h2>

      <p><strong>Key:</strong> {flag.flag_key}</p>
      <p>
<strong>Environment:</strong>

{flag.environment_id===1?"Development":flag.environment_id===2?"Staging":"Production"}</p>
      <p><strong>Type:</strong> {flag.type}</p>
      <p><strong>Default Value:</strong> {flag.default_value.toString()}</p>
      <p><strong>Description:</strong> {flag.description}</p>
      <p><strong>Owner Team:</strong> {flag.owner_team}</p>
      <p><strong>Status:</strong> {flag.enabled ? "Enabled" : "Disabled"}</p>
      <p>
  <strong>Created At:</strong>{" "}
  {new Date(flag.created_at).toLocaleString()}
</p>

<p>
  <strong>Updated At:</strong>{" "}
  {new Date(flag.updated_at).toLocaleString()}
</p>
      <hr />

      <h3>Targeting Rules</h3>
      <p>Coming in Milestone 2...</p>
    </div>
  );
}

export default FlagDetail;