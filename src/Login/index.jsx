import LoginForm from "./LoginForm";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className={styles.login_container}>
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
    </section>
  );
}
