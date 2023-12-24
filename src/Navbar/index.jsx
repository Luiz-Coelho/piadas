import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import styles from "./Navbar.module.css";
import { FaRegHeart } from "react-icons/fa";

import UserAuthenticated from "./UserAuthenticated";
import UserNotAuthenticated from "./UserNotAuthenticated";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.links_container}>
        <Link to={"/"}>Home</Link>
        <Link to={"/jokes"}>Piadas</Link>
        <Link to={"/favorites"}>
          <FaRegHeart />
        </Link>
        {user ? <UserAuthenticated /> : <UserNotAuthenticated />}
      </div>
    </nav>
  );
}
