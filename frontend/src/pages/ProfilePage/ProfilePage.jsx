import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import drone from "../../assets/images/DronePic.svg";
import styles from "./ProfilePage.module.css";
import infoIcon from "./../../assets/images/infoIcon.svg";

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

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.carouselContainer}>
          <DroneOption className="left" />
          <DroneOption className="center" />
          <DroneOption className="right" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
