import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import drone from "../../assets/images/DronePic.svg";
import styles from "./ProfilePage.module.css";
import infoIcon from "./../../assets/images/infoIcon.svg";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { getUserDrones } from "../../api";

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

const Table = ({ drones }) => {
  return (
    <div className={styles.tableComponent}>
      <div className={styles.tableContainer}>
        <h2 className={styles.tableHeader}>Інвентар</h2>
        <div className={styles.inventContainer}>
          {drones.map((drone) => (
            <TableItem key={drone.serial_number} drone={drone} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TableItem = ({ drone }) => {
  const statuses = ["OK", "Damaged", "Destroyed"];
  const [statusIndex, setStatusIndex] = useState(0);
  const { name, image, serial_number, status } = drone;

  const toggleStatus = () => {
    // Set the next status, cycling back to the first after the last
    setStatusIndex((prevIndex) => (prevIndex + 1) % statuses.length);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "OK":
        return { color: "green", text: "Справний" };
      case "Damaged":
        return { color: "yellow", text: "Пошкоджено" };
      case "Destroyed":
        return { color: "red", text: "Знищено" };
      default:
        return { color: "black", text: "Не відомо" };
    }
  };

  const currentStatus = statuses[statusIndex];
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

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    if (user) {
      getUserDrones(user)
        .then((data) => {
          setDrones(data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Carousel></Carousel>
        <Table drones={drones}></Table>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
