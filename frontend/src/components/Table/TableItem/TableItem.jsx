import React, { useState } from "react";
import { updateDroneStatus } from "../../../api";
import styles from "./TableItem.module.css";
import useDroneStatus from "../../../hooks/useDroneStatus";

const TableItem = ({ drone }) => {
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
      </div>
    </div>
  );
};

export default TableItem;
