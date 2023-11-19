import { useState } from "react";
import { updateDroneStatus } from "../api";

const useDroneStatus = (initialStatus, serialNumber) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const statuses = ["ok", "damaged", "destroyed"];

  const getNextStatus = (status) => {
    const currentIndex = statuses.indexOf(status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    return statuses[nextIndex];
  };

  const toggleStatus = () => {
    const newStatus = getNextStatus(currentStatus);
    setCurrentStatus(newStatus);
    updateDroneStatus(serialNumber, newStatus).catch(console.error);
  };

  return { currentStatus, toggleStatus };
};

export default useDroneStatus;
