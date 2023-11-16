import "./Header.css";
import headerLogo from "../../assets/images/headerlogo.png";

function Header() {
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
    </div>
  );
}

export default Header;
