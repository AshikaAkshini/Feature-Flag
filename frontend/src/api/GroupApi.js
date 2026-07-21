const API_URL = "http://127.0.0.1:8000";

export async function getGroups() {
  const response = await fetch(`${API_URL}/groups/`);
  return response.json();
}

export async function getFlagGroups(flagId) {
  const response = await fetch(`${API_URL}/flag-groups/${flagId}`);
  return response.json();
}

export async function assignGroup(flagId, groupId) {
  const response = await fetch(`${API_URL}/flag-groups/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flag_id: flagId,
      group_id: groupId,
    }),
  });

  return response.json();
}

export async function deleteFlagGroup(id) {
  const response = await fetch(`${API_URL}/flag-groups/${id}`, {
    method: "DELETE",
  });

  return response.json();
}