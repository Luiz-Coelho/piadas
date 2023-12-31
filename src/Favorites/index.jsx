import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import Container from "../components/Container";
import FavoriteCard from "./FavoriteCard";

import styles from "./Favorites.module.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const token = Cookies.get("user");

  useEffect(() => {
    fetch("https://piadas-backend.onrender.com/api/favorites", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        setFavorites(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const removeFavorite = (id) => {
    fetch(`https://piadas-backend.onrender.com/api/favorites/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFavorites(favorites.filter((favorite) => favorite._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <section className={styles.favorites_container}>
        <h1 className={styles.page_title}>Favoritos</h1>
        <div className={styles.favorites_grid}>
          {favorites.length === 0 && (
            <div className={styles.no_favorites}>
              <p>Ops</p>
              <p>
                Parece que você ainda não adicionou nenhuma piada a sua lista de
                favoritos.
              </p>
              <p>
                Mas você pode procurar piadas
                <Link to={"/jokes"}>clicando aqui.</Link>
              </p>
            </div>
          )}
          {favorites.length !== 0 &&
            favorites.map((favorite) => (
              <FavoriteCard
                id={favorite.id}
                key={favorite._id}
                type={favorite.type}
                setup={favorite.setup}
                delivery={favorite.delivery}
                joke={favorite.joke}
                onClick={() => removeFavorite(favorite._id)}
              />
            ))}
        </div>
      </section>
    </Container>
  );
}
