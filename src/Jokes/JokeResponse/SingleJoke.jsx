import styles from "./SingleJoke.module.css";

export default function SingleJoke({ single }) {
  return (
    <div className={styles.single_joke}>
      <p>{single}</p>
    </div>
  );
}
