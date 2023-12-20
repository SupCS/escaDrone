import React, { useState, useEffect, useContext } from "react";
import { getUserDrones, createFlight } from "../../api";
import styles from "./PlanningPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../AuthContext";

// const Paragraph = () => {
//   return (
//     <>
//       <div className={styles.paragraphContainer}>
//         <div className={styles.paragraphFrame}></div>
//       </div>
//     </>
//   );
// };

const Map = () => {
  return (
    <iframe
      title={"Карта Київа"}
      width="800"
      height="300"
      loading="lazy"
      allowFullScreen=""
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254535.6429754143!2d30.36090942810521!3d50.45041439850001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cae4d0d87b7b%3A0x52f410622b75f0b7!2z0JrRgNCw0YHQutCw0Y8sINCh0LDQvdC-0LLRgdC60LDRjyDQvtCx0LsuLCAwNDAwMA!5e0!3m2!1sen!2sus!4v1633351454692!5m2!1sen!2sus"
      style={{
        border: 0,
        margin: "50px auto 0",
        display: "block",
        borderRadius: "10px",
      }}
    ></iframe>
  );
};

const PlanningPage = () => {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState("");
  const [flightPurpose, setFlightPurpose] = useState("");
  const [startCoordinates, setStartCoordinates] = useState("");
  const [endCoordinates, setEndCoordinates] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserDrones(user)
      .then((data) => setDrones(data))
      .catch((error) => console.error(error));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDrone) {
      console.error("Please select a drone.");
      return;
    }

    const flightData = {
      serial_number: selectedDrone,
      purpose: flightPurpose,
      start_coordinates: startCoordinates,
      end_coordinates: endCoordinates,
      date: date,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      const response = await createFlight(flightData);
      console.log("Flight created:", response);
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  };

  return (
    <>
      <Header />

      <div className={styles.title}>ПЛАНУВАННЯ ПОЛЬОТУ</div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedDrone}
            onChange={(e) => setSelectedDrone(e.target.value)}
          >
            {drones.map((drone) => (
              <option key={drone.serial_number} value={drone.serial_number}>
                {drone.name} {`(${drone.serial_number})`}
              </option>
            ))}
          </select>
          <textarea
            value={flightPurpose}
            onChange={(e) => setFlightPurpose(e.target.value)}
            placeholder="Ціль польоту"
          />
          <input
            type="text"
            value={startCoordinates}
            onChange={(e) => setStartCoordinates(e.target.value)}
            placeholder="Координати початкової точки"
          />
          <input
            type="text"
            value={endCoordinates}
            onChange={(e) => setEndCoordinates(e.target.value)}
            placeholder="Координати кінцевої точки"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button type="submit" className={styles.buttonPlanning}>
            ЗАПЛАНУВАТИ
          </button>
        </form>
      </div>
      <Map />

      <Footer />
    </>
  );
};

export default PlanningPage;
