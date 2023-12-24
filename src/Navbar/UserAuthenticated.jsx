import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import styles from "./Navbar.module.css";

const s3Url = import.meta.env.VITE_S3_URL;

const UserAuthenticated = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Link to={`/user/${user._id}`}>
        {user.profilePicture ? (
          <img
            src={`${s3Url}${user.profilePicture}`}
            alt="ProfilePicture"
            className={styles.profile_picture}
          />
        ) : (
          <FaRegUser />
        )}
      </Link>
      <button onClick={handleLogout}>
        <RiLogoutBoxRLine />
      </button>
    </>
  );
};

export default UserAuthenticated;
