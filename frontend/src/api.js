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
  } catch (error) {
    console.error("Error updating drone status: ", error);
  }
};

export const DroneStorageList = async () => {
  try {
    const response = await fetch("/api/drone-storage/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching drone storage data: ", error);
    throw error;
  }
};

export const AddDroneToInventory = async (droneModel, username) => {
  try {
    const response = await fetch(`/api/add-drone-to-inventory/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        droneModel: droneModel,
        username: username,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error("Немає доступних дронів");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding drone to inventory: ", error);
    throw error;
  }
};

export const sendFeedback = async (name, email, message) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/send-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending feedback: ", error);
    throw error;
  }
};

export const removeDroneFromInventory = async (serialNumber) => {
  try {
    const response = await fetch(`/api/remove-drone-from-inventory/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial_number: serialNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing drone from inventory: ", error);
    throw error;
  }
};

export const createFlight = async (flightData) => {
  console.log("Sending flight data:", flightData); // Вывод отправляемых данных

  try {
    const response = await fetch("/api/create-flight/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });

    if (!response.ok) {
      console.error("Response not ok:", response);
      const errorResponse = await response.text(); // Получаем текст ошибки
      throw new Error(`Network response was not ok: ${errorResponse}`);
    }

    const responseData = await response.json();
    console.log("Response data:", responseData); // Вывод полученного ответа
    return responseData;
  } catch (error) {
    console.error("Error creating flight: ", error);
    throw error;
  }
};
