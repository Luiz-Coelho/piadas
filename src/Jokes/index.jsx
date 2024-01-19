import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Cookies from "js-cookie";

import Message from "../components/Message";
import JokeForm from "./JokeForm";
import JokeResponse from "./JokeResponse";
import Container from "../components/Container";

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

  const otherJoke = () => {};

  return (
    <Container>
      {formVisibility && (
        <JokeForm
          getData={getData}
          handleSubmit={handleSubmit}
          randomJoke={randomJoke}
          clickSearch={clickSearch}
          handleSearch={handleSearch}
        />
      )}
      {!formVisibility && jokeData && (
        <JokeResponse
          single={jokeData.joke}
          setup={jokeData.setup}
          delivery={jokeData.delivery}
          error={jokeData.error}
          message={jokeData.message}
          addFavorite={addFavorite}
          otherJoke={otherJoke}
          changeFormParams={() => {
            setFormVisibility(true);
          }}
        />
      )}
    </Container>
  );
}
