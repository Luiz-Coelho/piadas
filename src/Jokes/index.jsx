import { useEffect, useState } from "react";
import styles from "./Jokes.module.css";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import JokeForm from "./JokeForm";
import SearchBox from "./SearchBox";

import JokeResponse from "./JokeResponse";

export default function Jokes() {
  const [jokeData, setJokeData] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [formVisibility, setFormVisibility] = useState(true);

  function getData(route) {
    return fetch(`https://v2.jokeapi.dev/${route}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  function randomJoke() {
    getData("joke/Any").then((data) => {
      setJokeData(data);
      setFormVisibility(false);
    });
  }

  function handleSubmit(url) {
    getData(url).then((data) => {
      setJokeData(data);
      setFormVisibility(false);
    });
  }

  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  function clickSearch() {
    setJokeData("");
    if (keyword) {
      getData(`joke/Any?contains=${keyword}`).then((data) => {
        setJokeData(data);
        setFormVisibility(false);
        console.log(data);
      });
    }
  }

  const addFavorite = () => {
    fetch("http://localhost:5000/api/favorites", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jokeData),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <section className={styles.jokes_container}>
      <div className={styles.jokes_header}>
        <button onClick={randomJoke}>Piada aleatória</button>
        <SearchBox onClick={clickSearch} onChange={handleSearch} />
        <Link to={"https://sv443.net/jokeapi/v2/#submit"} target="_blank">
          Enviar uma piada
        </Link>
      </div>
      <div className={styles.form_div}>
        {formVisibility && (
          <JokeForm getData={getData} handleSubmit={handleSubmit} />
        )}
        {!formVisibility && jokeData && (
          <JokeResponse
            single={jokeData.joke}
            setup={jokeData.setup}
            delivery={jokeData.delivery}
            error={jokeData.error}
            message={jokeData.message}
            addFavorite={addFavorite}
            otherJoke={() => {
              setFormVisibility(true);
            }}
          />
        )}
      </div>
    </section>
  );
}
