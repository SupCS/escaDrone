import React, { useState } from "react";
import { removeDroneFromInventory } from "../../../api";
import styles from "./TableItem.module.css";
import useDroneStatus from "../../../hooks/useDroneStatus";

const TableItem = ({ drone, onRemove }) => {
  const { name, image, serial_number, status } = drone;
  const { currentStatus, toggleStatus } = useDroneStatus(status, serial_number);

  const getStatusStyles = (status) => {
    switch (status) {
      case "ok":
        return { color: "green", text: "Справний" };
      case "damaged":
        return { color: "yellow", text: "Пошкоджено" };
      case "destroyed":
        return { color: "red", text: "Знищено" };
      default:
        return { color: "black", text: "Невідомо" };
    }
  };

  const handleRemove = async () => {
    try {
      await removeDroneFromInventory(drone.serial_number);
      onRemove(drone.serial_number);
    } catch (error) {
      console.error("Error removing drone: ", error);
    }
  };

  const { color, text } = getStatusStyles(currentStatus);

  return (
    <div className={styles.inventItem}>
      <div className={styles.inventItemLeft}>
        <div className={styles.tableImageContainer}>
          <img src={image} alt="drone"></img>
        </div>
        <div className={styles.inventItemText}>
          <h3>{name}</h3>
          <p>{serial_number}</p>
        </div>
      </div>
      <div className={styles.inventItemRight} onClick={toggleStatus}>
        <h4>Стан:</h4>
        <div className={styles.itemStatus} style={{ color }}>
          <p>{text}</p>
        </div>
        <button onClick={handleRemove}>Видалити</button>
      </div>
    </div>
  );
};

export default TableItem;
