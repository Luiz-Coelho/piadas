import styles from "./ErrorJoke.module.css";

export default function ErrorJoke({ message }) {
  return (
    <div className={styles.error_joke}>
      <h2>Sorry</h2>
      <p>{message}</p>
    </div>
  );
}
