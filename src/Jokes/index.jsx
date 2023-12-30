import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Cookies from "js-cookie";

import Message from "../components/Message";
import JokeForm from "./JokeForm";
import SearchBox from "./SearchBox";
import JokeResponse from "./JokeResponse";
import Container from "../components/Container";

import styles from "./Jokes.module.css";

export default function Jokes() {
  const { user } = useAuth();

  const token = Cookies.get("user");

  const navigate = useNavigate();

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
    getData(
      "joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    ).then((data) => {
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
    if (!user) {
      navigate("/login");
    }

    fetch("https://piadas-backend.onrender.com/api/favorites", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jokeData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMessage("Piada adicionada a sua lista de favoritos");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <section className={styles.jokes_container}>
        <button onClick={randomJoke} className={styles.random_joke_button}>
          Ver piada aleatória
        </button>
        <div className={styles.border_div}></div>
        <SearchBox onClick={clickSearch} onChange={handleSearch} />
        <div className={styles.border_div}></div>
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
        <div className={styles.border_div}></div>
        <Link
          to={"https://sv443.net/jokeapi/v2/#submit"}
          target="_blank"
          className={styles.submit_joke_button}
        >
          Enviar uma piada
        </Link>
      </section>
    </Container>
  );
}
