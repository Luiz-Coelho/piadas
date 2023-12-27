import { Link } from "react-router-dom";

import RegisterForm from "./RegisterForm";

import styles from "./Register.module.css";
import Container from "../components/Container";

export default function Register() {
  return (
    <Container>
      <section className={styles.register_container}>
        <h2>Sign Up</h2>
        <RegisterForm></RegisterForm>
        <div className={styles.already_registered_div}>
          <p>
            Já tem uma conta?
            <span>
              <Link to={"/register"} className={styles.already_registered_link}>
                Login aqui
              </Link>
            </span>
          </p>
        </div>
      </section>
    </Container>
  );
}
