import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem-vindo ao site das Piadas!</h1>
      <div className={styles.briefing_container}>
        <p>
          Você pode dar início a sua jornada nesse site indo na aba de Piadas ou
          <Link className={styles.link}>Clicando aqui</Link>
        </p>
      </div>
    </section>
  );
}
