import SingleJoke from "./SingleJoke";
import TwopartJoke from "./TwopartJoke";
import ErrorJoke from "./ErrorJoke";

import styles from "./JokeResponse.module.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function JokeResponse({
  single,
  setup,
  delivery,
  error,
  message,
  otherJoke,
  addFavorite,
  changeFormParams,
}) {
  return (
    <section className={styles.response_container}>
      <div className={styles.response_wrapper}>
        {single && <SingleJoke single={single} />}
        {setup && <TwopartJoke setup={setup} delivery={delivery} />}
        {error && <ErrorJoke message={message} />}
        <div className={styles.controls_div}>
          <button onClick={addFavorite}>
            <FaRegHeart />
          </button>
          <button onClick={otherJoke}>Outra piada</button>
          <button onClick={changeFormParams}>Voltar ao formulário</button>
        </div>
      </div>
      <Link
        to={"https://sv443.net/jokeapi/v2/#submit"}
        target="_blank"
        className={styles.submit_joke_button}
      >
        Envie uma piada
      </Link>
    </section>
  );
}
