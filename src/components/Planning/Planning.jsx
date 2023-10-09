import React from 'react';
import styles from "./Planning.module.css";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";

const Paragraph = () => {
    return (
        <>
            <div className={styles.paragraphContainer}>
                <div className={styles.paragraphFrame}></div>
            </div>
        </>
    )
}

const Map = () => {
    return (
        <iframe
            width="800"
            height="300"
            loading="lazy"
            allowFullScreen=""
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254535.6429754143!2d30.36090942810521!3d50.45041439850001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cae4d0d87b7b%3A0x52f410622b75f0b7!2z0JrRgNCw0YHQutCw0Y8sINCh0LDQvdC-0LLRgdC60LDRjyDQvtCx0LsuLCAwNDAwMA!5e0!3m2!1sen!2sus!4v1633351454692!5m2!1sen!2sus"
            style={{
                border: 0,
                margin: '50px auto 0',
                display: 'block',
                borderRadius: '10px',
            }}
        >
        </iframe>
    )
}

const Planning = () => {
    return (
        <>
            <Header/>

            <div className={styles.title}>ПЛАНУВАННЯ ПОЛЬОТУ</div>
            <div className={styles.container}>
                <div className={styles.frame}>
                    <Paragraph/>
                    <Paragraph/>
                    <Paragraph/>
                    <Paragraph/>
                    <Paragraph/>
                </div>
            </div>

            <Map />

            <button className={styles.buttonPlanning}>ЗАПЛАНУВАТИ</button>

            <Footer/>
        </>
    );
};

export default Planning;
