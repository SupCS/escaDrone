import React from "react";
import "./LoginPage.css";
import iconSvg from "../../assets/images/Brigada5.svg";

const LoginPage = () => {
  return (
    <div className="container">
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
      <img src={iconSvg} alt="Icon description" className="svgIcon" />
    </div>
  );
};

export default LoginPage;
