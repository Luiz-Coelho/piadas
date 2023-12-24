import { RiDislikeLine } from "react-icons/ri";

import styles from "./Favorites.module.css";

export default function FavoriteCard({
  id,
  type,
  setup,
  delivery,
  joke,
  onClick,
}) {
  return (
    <div
      key={id}
      className={type === "twopart" ? styles.twopart_joke : styles.single_joke}
    >
      {type === "twopart" && (
        <>
          <div className={styles.title_card_container}>
            <h2>Duas partes</h2>
          </div>
          <p>{setup}</p>
          <p>{delivery}</p>
        </>
      )}
      {type === "single" && (
        <>
          <div className={styles.title_card_container}>
            <h2>Uma parte</h2>
          </div>
          <p>{joke}</p>
        </>
      )}
      <button onClick={onClick}>
        <RiDislikeLine />
      </button>
    </div>
  );
}
