import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./ProfilePage.module.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { getUserDrones } from "../../api";
import Carousel from "../../components/Carousel/Carousel";
import Table from "../../components/Table/Table";
import DroneStorageComponent from "../../components/DroneStorage";

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

  const handleDroneRemove = (serialNumber) => {
    setDrones(drones.filter((drone) => drone.serial_number !== serialNumber));
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        {/* <Carousel></Carousel> */}
        <DroneStorageComponent
          user={user}
          getUserDrones={getUserDrones}
          setDrones={setDrones}
        />
        <Table drones={drones} onRemove={handleDroneRemove}></Table>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
