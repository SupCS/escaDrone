import React, { useEffect, useState } from "react";
import { AddDroneToInventory, DroneStorageList } from "../api";

function DroneStorage({ user, getUserDrones, setDrones }) {
  const [droneStorage, setDroneStorage] = useState([]);

  useEffect(() => {
    // Завантаження даних про дрони на складі
    DroneStorageList()
      .then((data) => {
        setDroneStorage(data);
      })
      .catch((error) => {
        console.error("Error fetching drone storage data: ", error);
      });
  }, []);

  const handleAddToInventory = (droneModel) => {
    // Відправка запиту на додавання дрона до інвентаря
    AddDroneToInventory(droneModel, user)
      .then((response) => {
        // Обробка успіху
        alert(response.message);
        DroneStorageList().then(setDroneStorage); // Оновлюємо склад
        getUserDrones(user).then(setDrones); // Оновлюємо інвентар
      })
      .catch((error) => {
        // Обробка помилки
        alert(error.message);
        console.error("Error adding drone to inventory: ", error);
      });
  };

  return (
    <div>
      <h2>Склад дронів</h2>
      {droneStorage.map((drone) => (
        <div key={drone.id}>
          <p>Модель: {drone.model}</p>
          <p>Кількість: {drone.quantity}</p>
          <button onClick={() => handleAddToInventory(drone.model)}>
            Додати в інвентар
          </button>
        </div>
      ))}
    </div>
  );
}

export default DroneStorage;
