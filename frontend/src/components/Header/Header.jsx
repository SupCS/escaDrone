import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import headerLogo from "../../assets/images/headerlogo.png";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/images/ProfileIcon.svg";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      // Проверяем, является ли e.target иконкой профиля
      if (!e.target.classList.contains("profileIcon")) {
        setDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

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
        <div className="profile-container">
          <img
            className="profileIcon"
            src={ProfileIcon}
            alt="profile"
            onClick={user ? toggleDropdown : () => navigate("/login")}
          />
          {dropdownOpen && user && (
            <div className="dropdown-menu">
              <p>{user}</p>
              <button onClick={handleLogout}>Вийти</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
