import { FaRegHeart } from "react-icons/fa";

import styles from "./Controls.module.css";

export default function Controls({ otherJoke, addFavorite }) {
  return (
    <div className={styles.controls_div}>
      <button className={styles.like_button} onClick={addFavorite}>
        <FaRegHeart />
      </button>
      <button className={styles.another_joke} onClick={otherJoke}>
        Get another joke
      </button>
    </div>
  );
}
