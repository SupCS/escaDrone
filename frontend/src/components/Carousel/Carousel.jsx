import React from "react";
import styles from "./Carousel.module.css";
import DroneOption from "./DroneOption/DroneOption";

const Carousel = () => {
  return (
    <div className={styles.carouselComponent}>
      <div className={styles.carouselContainer}>
        <DroneOption className="left" />
        <DroneOption className="center" />
        <DroneOption className="right" />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.orderButton}>Відправити</button>
      </div>
    </div>
  );
};

export default Carousel;
