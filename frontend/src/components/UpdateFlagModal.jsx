const updateFlag = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/flags/${newFlag.flag_key}`,
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
    loadFlags();

  } catch (err) {
    console.error(err);
  }
};