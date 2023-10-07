import React from "react";
import "./LoginPage.css";
import Footer from "../Footer/Footer";

const LoginPage = () => {
  return (
    <div className="container">
      <div className="loginPage__container">
      <div className="formContainer">
        <div className="login__header">
          Вхід в аккаунт
        </div>
        <input
          id="loginInput"
          type="text"
          placeholder="Логін"
          className="input"
        />
        <input
          id="passwordInput"
          type="password"
          placeholder="Пароль"
          className="input"
        />
        <button className="button">Увійти</button>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
