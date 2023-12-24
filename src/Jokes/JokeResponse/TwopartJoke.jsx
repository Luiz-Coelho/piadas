import styles from "./TwopartJoke.module.css";

export default function TwopartJoke({ setup, delivery }) {
  return (
    <div className={styles.twopart_joke}>
      <h2>Parte um:</h2>
      <p>{setup}</p>
      <h2>Parte dois:</h2>
      <p>{delivery}</p>
    </div>
  );
}
