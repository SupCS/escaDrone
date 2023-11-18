import { React, useState, useContext } from "react";
import "./LoginPage.css";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../api";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setUsernameError(null);
    setPasswordError(null);

    if (!username) {
      setUsernameError("Поле 'Логін' має бути заповнено");
      return;
    }

    if (!password) {
      setPasswordError("Поле 'Пароль' має бути заповнено");
      return;
    }
    const result = await loginUser(username, password);
    if (result) {
      login(username);
      navigate("/profile");
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
          {usernameError && <p className="error">{usernameError}</p>}
          <input
            id="passwordInput"
            type="password"
            placeholder="Пароль"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
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
