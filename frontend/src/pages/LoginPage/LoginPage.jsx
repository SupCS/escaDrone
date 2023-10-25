import { React, useState } from "react";
import "./LoginPage.css";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    const result = await loginUser(username, password);
    if (result) {
      setMessage("Успішний вхід!");
      // Сюди вставимо якусь дію
    } else {
      setMessage("Невірний логін або пароль.");
    }
  };

  return (
    <div className="container">
      <div className="loginPage__container">
        <div className="formContainer">
          <div className="login__header">Вхід в аккаунт</div>
          <input
            id="loginInput"
            type="text"
            placeholder="Логін"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="passwordInput"
            type="password"
            placeholder="Пароль"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleLogin}>
            Увійти
          </button>
          {message && <p>{message}</p>}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
