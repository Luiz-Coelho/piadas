import LoginForm from "./LoginForm";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function Login() {
  return (
    <Container>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <LoginForm></LoginForm>
        <div className={styles.new_acc_div}>
          <p>
            Não tem um conta?
            <span>
              <Link to={"/register"} className={styles.new_acc_link}>
                Criar conta
              </Link>
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
}
