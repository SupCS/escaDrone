import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './DroneListPage.module.css';
import drone from "../../assets/images/DronePic.svg";

function Drone(){
    return (
        <div className={styles.elem}>
            <div className={styles.image}>
                <img src={drone} alt="DRONE" />
            </div>
            <div className={styles.about}>
                <div className={styles.name}>
                DJI MAVIC 3T
                </div>
                <div className={styles.droneInfo}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit viverra velit ornare aliquet vel ut elit. Phasellus malesuada eleifend purus sed rutrum. Aliquam porttitor sodales volutpat. Quisque vitae tincidunt nunc. Ut congue vitae justo vitae sagittis. Pellentesque fringilla malesuada justo non ultrices. Morbi sit amet gravida mi.
                </div>
            </div>
        </div>
    )
}

function DroneListPage() {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.listcont}>
                    <div className={styles.info}>
                    ІНФО
                    </div>
                    <div className={styles.list}>
                        <Drone />
                        <Drone />
                        <Drone />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DroneListPage;