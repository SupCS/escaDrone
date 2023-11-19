import CryptoJS from "crypto-js";
// хешування паролю
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};
// логін
export const loginUser = async (username, password) => {
  const hashedPassword = hashPassword(password);

  const response = await fetch("http://127.0.0.1:8000/api/user-check/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: hashedPassword,
    }),
  });

  const data = await response.json();
  return data.message;
};

//  Вивід дронів у табличку
export const getUserDrones = async (username) => {
  const response = await fetch(`/api/user-drones/${username}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

// Зміна статусів дронів
export const updateDroneStatus = async (serialNumber, newStatus) => {
  try {
    const response = await fetch(`/api/update-drone-status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial_number: serialNumber,
        status: newStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Обработка ответа от сервера (если необходимо)
  } catch (error) {
    console.error("Error updating drone status: ", error);
  }
};
