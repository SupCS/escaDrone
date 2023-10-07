import "./Footer.css"
import iconSvg from "../../assets/images/Brigada5.svg";

function Footer() {
    return (
        <div className="footer">
            <img src={iconSvg} alt="Brigada5 logo" className="svgIcon" />
        </div>
    )
}

export default Footer;