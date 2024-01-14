import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import styles from "./Navbar.module.css";
import { FaRegHeart } from "react-icons/fa";

import UserAuthenticated from "./UserAuthenticated";
import UserNotAuthenticated from "./UserNotAuthenticated";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className={styles.navbar_container}>
      <div className={styles.nav_wrapper}>
        <nav>
          <ul role="list" className={styles.nav_list}>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jokes"}>Piadas</Link>
            </li>
            <li>
              <Link to={"/favorites"}>
                <FaRegHeart />
              </Link>
            </li>
            {user ? <UserAuthenticated /> : <UserNotAuthenticated />}
          </ul>
        </nav>
      </div>
    </header>
  );
}
