import { useRef, useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";

import styles from "./LoginForm.module.css";
import { VscAccount } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";

export default function LoginForm() {
  const { login, isLoading, error } = useLogin();

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <div className={styles.input_div}>
        <label htmlFor="email">
          <VscAccount />
        </label>
        <input
          name="email"
          id="email"
          type="text"
          placeholder="Email"
          ref={emailRef}
          autoComplete="off"
          onChange={handleEmail}
          value={email}
          required
        />
      </div>
      <div className={styles.input_div}>
        <label htmlFor="password">
          <CiLock />
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}
