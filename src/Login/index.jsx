import LoginForm from "./LoginForm";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function Login() {
  return (
    <Container>
      <section className={styles.login_container}>
        <h2>Login</h2>
        <LoginForm></LoginForm>
        <div className={styles.new_acc_div}>
          <p>
            Não tem uma conta?{" "}
            <Link to={"/register"} className={styles.new_acc_link}>
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </Container>
  );
}
