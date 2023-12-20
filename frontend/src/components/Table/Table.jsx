import React from "react";
import TableItem from "./TableItem/TableItem";
import styles from "./Table.module.css";

const Table = ({ drones, onRemove }) => {
  return (
    <div className={styles.tableComponent}>
      <div className={styles.tableContainer}>
        <h2 className={styles.tableHeader}>Інвентар</h2>
        <div className={styles.inventContainer}>
          {drones.map((drone) => (
            <TableItem
              onRemove={onRemove}
              key={drone.serial_number}
              drone={drone}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
