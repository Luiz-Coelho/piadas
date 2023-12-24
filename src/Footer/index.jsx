import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.social_media_container}>
        <Link
          to={"https://www.facebook.com/profile.php?id=100001258678529"}
          target="_blank"
        >
          <FaFacebook />
        </Link>
        <Link to={"https://www.instagram.com/lfcs99/"} target="_blank">
          <FaInstagram />
        </Link>
        <Link>
          <FaLinkedin />
        </Link>
      </div>
      <div className={styles.copyright_container}>
        <h2>Piadas &copy; 2023</h2>
      </div>
    </footer>
  );
}
