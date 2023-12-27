import { Link } from "react-router-dom";

import styles from "./Missing.module.css";
import Container from "../components/Container";

export default function Missing() {
  return (
    <Container>
      <section className={styles.missing_page}>
        <h2>Oops!</h2>
        <p>Page Not Found</p>
        <Link to="/">Visit Our Homepage</Link>
      </section>
    </Container>
  );
}
