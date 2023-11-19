import React from "react";
import styles from "./DroneOption.module.css";
import infoIcon from "../../../assets/images/infoIcon.svg";
import drone from "../../../assets/images/DronePic.svg";

const DroneOption = ({ className }) => {
  return (
    <div className={`${styles.optionContainer} ${styles[className]}`}>
      <div className={styles.info}>
        <img src={infoIcon} alt="info" />
      </div>
      <div className={styles.image}>
        <img src={drone} alt="DRONE" />
      </div>
      <div className={styles.name}>DJI MAVIC 3T</div>
    </div>
  );
};

export default DroneOption;
