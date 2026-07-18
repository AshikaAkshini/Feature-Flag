import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Flags() {
  const [flags, setFlags] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showReadModal, setShowReadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [environments, setEnvironments] = useState([]);
  const navigate = useNavigate();
  const [targetUsers, setTargetUsers] = useState([]);
  const [newUserId, setNewUserId] = useState("");

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [flagGroups, setFlagGroups] = useState([]);

  const [newFlag, setNewFlag] = useState({
    flag_key: "",
    environment_id: 1,
    type: "boolean",
    default_value: false,
    description: "",
    owner_team: "",
    enabled: true,
  });

  const loadFlags = () => {
    fetch("http://127.0.0.1:8000/flags/")
      .then((res) => res.json())
      .then((data) => setFlags(data))
      .catch((err) => console.error(err));
  };

  const loadTargetUsers = async (flagId) => {
  const res = await fetch(`http://127.0.0.1:8000/target-users/${flagId}`);
  const data = await res.json();
  setTargetUsers(data);
};

const loadGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/groups/");
  const data = await res.json();
  setGroups(data);
};

const loadFlagGroups = async (flagId) => {
  const res = await fetch(`http://127.0.0.1:8000/flag-groups/${flagId}`);
  const data = await res.json();
  setFlagGroups(data);
};
  useEffect(() => {

loadFlags();

fetch("http://127.0.0.1:8000/environments/")
.then((res)=>res.json())
.then((data)=>setEnvironments(data));

},[]);
  const createFlag = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/flags/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlag),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        alert(JSON.stringify(error));
        return;
      }

      setShowCreateModal(false);
      setNewFlag({
        flag_key: "",
        environment_id: 1,
        type: "boolean",
        default_value: false,
        description: "",
        owner_team: "",
        enabled: true,
      });
      loadFlags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRead = (flag) => {
  setSelectedFlag(flag);
  setShowReadModal(true);
  setOpenDropdown(null);

  loadTargetUsers(flag.id);
  loadGroups();
  loadFlagGroups(flag.id);
};

const addTargetUser = async () => {
  if (!newUserId) return;

  const response = await fetch("http://127.0.0.1:8000/target-users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flag_id: selectedFlag.id,
      user_id: newUserId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    alert(error.detail);
    return;
  }

  setNewUserId("");
  loadTargetUsers(selectedFlag.id);
};

const deleteTargetUser = async (id) => {
  await fetch(`http://127.0.0.1:8000/target-users/${id}`, {
    method: "DELETE",
  });

  loadTargetUsers(selectedFlag.id);
};

const addGroup = async () => {
  if (!selectedGroup) return;

  const response = await fetch("http://127.0.0.1:8000/flag-groups/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flag_id: selectedFlag.id,
      group_id: Number(selectedGroup),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    alert(error.detail);
    return;
  }

  setSelectedGroup("");
  loadFlagGroups(selectedFlag.id);
};

  const handleUpdate = (flag) => {
  setSelectedFlag(flag);      // Store original flag
  setNewFlag({ ...flag });    // Copy data for editing
  setShowUpdateModal(true);
  setOpenDropdown(null);
};

  const updateFlag = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/flags/${selectedFlag.flag_key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFlag),
        }
      );

      if (!response.ok) {
        alert("Update failed");
        return;
      }

      setShowUpdateModal(false);
      setOpenDropdown(null);
      loadFlags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (key) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flag?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/flags/${key}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadFlags();
        setOpenDropdown(null);
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div>
      <h2>Feature Flags</h2>

      <div className="top-bar">
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          + Create Flag
        </button>

        <input
          type="text"
          placeholder="🔍 Search Flag..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Environment</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>

       <tbody>
  {flags
    .filter((flag) =>
      flag.flag_key.toLowerCase().includes(search.toLowerCase()) ||
      flag.owner_team.toLowerCase().includes(search.toLowerCase())
    )
    .map((flag) => (
      <tr
        key={flag.flag_key}
        onClick={() => navigate(`/flags/${flag.flag_key}`)}
        style={{ cursor: "pointer" }}
      >
                <td>{flag.flag_key}</td>
                <td>{flag.type}</td>
                <td>
  <span
    className={`env-badge ${
      flag.environment_id === 1
        ? "development"
        : flag.environment_id === 2
        ? "staging"
        : "production"
    }`}
  >
    {flag.environment_id === 1
      ? "Development"
      : flag.environment_id === 2
      ? "Staging"
      : "Production"}
  </span>
</td>

<td>
  <span className={flag.enabled ? "enabled" : "disabled"}>
    {flag.enabled ? "Enabled" : "Disabled"}
  </span>
</td>

<td>{flag.owner_team}</td>
                <td>
                  <div className="action-box">
                   
                    <button
  className="action-btn"
  onClick={(e) => {
    e.stopPropagation();

    setOpenDropdown(
      openDropdown === flag.flag_key ? null : flag.flag_key
    );
  }}
>
  Actions ▼
</button>

                    {openDropdown === flag.flag_key && (
                      <div className="dropdown">
                        <div
  onClick={(e) => {
    e.stopPropagation();
    handleRead(flag);
  }}
>
  👁 Read
</div>

<div
  onClick={(e) => {
    e.stopPropagation();
    handleUpdate(flag);
  }}
>
  ✏ Update
</div>

<div
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(flag.flag_key);
  }}
>
  🗑 Delete
</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Flag</h2>
              <button
                className="close-btn"
                onClick={() => {
    setShowCreateModal(false);

    setNewFlag({
        flag_key: "",
        environment_id: 1,
        type: "boolean",
        default_value: false,
        description: "",
        owner_team: "",
        enabled: true,
    });
}}
              >
                ✕
              </button>
            </div>

            <label>Key *</label>
            <input
              type="text"
              value={newFlag.flag_key}
              onChange={(e) =>
                setNewFlag({ ...newFlag, flag_key: e.target.value })
              }
            />
            <label>Environment</label>

<select
  value={newFlag.environment_id}
  onChange={(e) =>
    setNewFlag({
      ...newFlag,
      environment_id: Number(e.target.value),
    })
  }
>
  {environments.map((env) => (
    <option key={env.id} value={env.id}>
      {env.name}
    </option>
  ))}
</select>

            <label>Type *</label>

<select
value={newFlag.type}
onChange={(e)=>
setNewFlag({
...newFlag,
type:e.target.value
})
}
>

<option value="boolean">Boolean</option>

<option value="string">String</option>

<option value="number">Number</option>

</select>

            <label>Default Value *</label>
            <div className="switch-row">
              <input
                type="checkbox"
                checked={newFlag.default_value}
                onChange={(e) =>
                  setNewFlag({ ...newFlag, default_value: e.target.checked })
                }
              />
              <span>{newFlag.default_value ? "True" : "False"}</span>
            </div>

            <label>Description</label>
            <textarea
              rows="3"
              value={newFlag.description}
              onChange={(e) =>
                setNewFlag({ ...newFlag, description: e.target.value })
              }
            />

            <label>Owner Team</label>
            <select
              value={newFlag.owner_team}
              onChange={(e) =>
                setNewFlag({ ...newFlag, owner_team: e.target.value })
              }
            >
              <option value="">Select Team</option>
              <option value="Backend Team">Backend Team</option>
              <option value="Frontend Team">Frontend Team</option>
              <option value="AI Team">AI Team</option>
            </select>

            <label>Enabled</label>
            <div className="switch-row">
              <input
                type="checkbox"
                checked={newFlag.enabled}
                onChange={(e) =>
                  setNewFlag({ ...newFlag, enabled: e.target.checked })
                }
              />
              <span>{newFlag.enabled ? "Yes" : "No"}</span>
            </div>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewFlag({
                    flag_key: "",
                    environment_id: 1,
                    type: "boolean",
                    default_value: false,
                    description: "",
                    owner_team: "",
                    enabled: true,
                  });
                }}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={createFlag}>
                Create Flag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* READ MODAL */}
      {showReadModal && selectedFlag && (
        <div className="modal">
          <div className="modal-content">
            <h2>Feature Flag Details</h2>
            <p><strong>Key:</strong> {selectedFlag.flag_key}</p>
            <p>
<strong>Environment:</strong>

{
selectedFlag.environment_id===1
?"Development"
:selectedFlag.environment_id===2
?"Staging"
:"Production"
}

</p>
            <p><strong>Type:</strong> {selectedFlag.type}</p>
            <p><strong>Default Value:</strong> {selectedFlag.default_value.toString()}</p>
            <p><strong>Description:</strong> {selectedFlag.description}</p>
            <p><strong>Owner Team:</strong> {selectedFlag.owner_team}</p>
            <p><strong>Created At:</strong>{" "}{new Date(selectedFlag.created_at).toLocaleString()}</p>

            <p><strong>Updated At:</strong>{" "}{new Date(selectedFlag.updated_at).toLocaleString()}</p>
            <p><strong>Enabled:</strong> {selectedFlag.enabled ? "Yes" : "No"}</p>
            <hr />

<h3>User Targeting Rules</h3>

<input
  type="text"
  placeholder="Enter User ID"
  value={newUserId}
  onChange={(e) => setNewUserId(e.target.value)}
/>

<button onClick={addTargetUser}>
  Add
</button>

{targetUsers.map((user) => (
  <div key={user.id}>
    {user.user_id}

    <button onClick={() => deleteTargetUser(user.id)}>
      ✖
    </button>
  </div>
))}

<hr />

<h3>Group Targeting</h3>

<select
  value={selectedGroup}
  onChange={(e) => setSelectedGroup(e.target.value)}
>
  <option value="">Select Group</option>

  {groups.map((group) => (
    <option key={group.id} value={group.id}>
      {group.name}
    </option>
  ))}
</select>

<button onClick={addGroup}>
  Add
</button>

{flagGroups.map((group) => (
  <div key={group.id}>
    {group.group_name ?? group.group_id}
  </div>
))}

<hr />

<button
  className="save-btn"
  onClick={() => setShowReadModal(false)}
>
  Close
</button>
            
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
{showUpdateModal && (
  <div className="modal">
    <div className="modal-content">

      <h2>Update Feature Flag</h2>

      {/* Key */}
      <label>Key</label>
      <input
        type="text"
        value={newFlag.flag_key}
        onChange={(e) =>
          setNewFlag({
            ...newFlag,
            flag_key: e.target.value,
          })
        }
      />

      {/* Environment */}
      <label>Environment</label>
      <select
        value={newFlag.environment_id}
        onChange={(e) =>
          setNewFlag({
            ...newFlag,
            environment_id: Number(e.target.value),
          })
        }
      >
        {environments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.name}
          </option>
        ))}
      </select>

      {/* Type */}
      <label>Type</label>
      <select
        value={newFlag.type}
        onChange={(e) =>
          setNewFlag({
            ...newFlag,
            type: e.target.value,
          })
        }
      >
        <option value="boolean">Boolean</option>
        <option value="string">String</option>
        <option value="number">Number</option>
      </select>
<label>Default Value</label>

<div className="switch-row">
  <input
    type="checkbox"
    checked={newFlag.default_value}
    onChange={(e) =>
      setNewFlag({
        ...newFlag,
        default_value: e.target.checked,
      })
    }
  />

  <span>
    {newFlag.default_value ? "True" : "False"}
  </span>
</div>
            
            <label>Description</label>
            <textarea
              value={newFlag.description}
              onChange={(e) =>
                setNewFlag({ ...newFlag, description: e.target.value })
              }
            />

            <label>Owner Team</label>
            <select
              value={newFlag.owner_team}
              onChange={(e) =>
                setNewFlag({ ...newFlag, owner_team: e.target.value })
              }
            >
              <option value="Backend Team">Backend Team</option>
              <option value="Frontend Team">Frontend Team</option>
              <option value="AI Team">AI Team</option>
            </select>

            <label>Enabled</label>
            <div className="switch-row">
              <input
                type="checkbox"
                checked={newFlag.enabled}
                onChange={(e) =>
                  setNewFlag({ ...newFlag, enabled: e.target.checked })
                }
              />
              <span>{newFlag.enabled ? "Yes" : "No"}</span>
            </div>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={updateFlag}>
                Update Flag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flags;