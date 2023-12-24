import styles from "./Loading.module.css";
import gif from "../assets/gifs/loading-dog.gif";

export default function Loading() {
  return (
    <div className={styles.loading_container}>
      <img src={gif} alt="Loading Image" />
    </div>
  );
}
