import { Link } from "react-router-dom";

import styles from "./Missing.module.css";

export default function Missing() {
  return (
    <section className={styles.missing_page}>
      <h2>Oops!</h2>
      <p>Page Not Found</p>
      <Link to="/">Visit Our Homepage</Link>
    </section>
  );
}
