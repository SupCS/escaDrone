import React, { useContext } from "react";
import "./Header.css";
import headerLogo from "../../assets/images/headerlogo.png";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="left-links">
        <a href="/profile" className="header-link">
          Наші дрони
        </a>
        <a href="/planning" className="header-link">
          Планування
        </a>
      </div>
      <img src={headerLogo} alt="Лого" className="header-logo" />
      <div className="right-links">
        <a href="/dronelist" className="header-link">
          Дрон інфо
        </a>
        <a href="/contacts" className="header-link">
          Контакти
        </a>
      </div>
      <div>
        {user && <p>Залогінений як: {user}</p>}
        <button onClick={handleLogout}>Вийти</button>
      </div>
    </div>
  );
}

export default Header;
