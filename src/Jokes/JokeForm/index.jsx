import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./JokeForm.module.css";

import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Loading from "../../components/Loading";

import SearchBox from "./SearchBox";

export default function JokeForm({
  handleSubmit,
  getData,
  randomJoke,
  clickSearch,
  handleSearch,
}) {
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("");

  function submit(e) {
    e.preventDefault();

    let url = `joke/${selectedCategory}?`;

    if (selectedLanguage !== "en") {
      url += `lang=${selectedLanguage}&`;
    }
    if (type !== "any") {
      url += `&type=${type}`;
    }

    url += "blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    handleSubmit(url);
  }

  function handleLanguage(e) {
    setSelectedLanguage(e.target.value);
  }

  function handleCategory(e) {
    setSelectedCategory(e.target.value);
  }

  function handleType(e) {
    setType(e.target.value);
  }

  async function getAllData() {
    return Promise.all([
      getData("languages").catch((err) => console.log(err)),
      getData("categories").catch((err) => console.log(err)),
    ]);
  }

  useEffect(() => {
    getAllData().then((data) => {
      setProjectData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className={styles.jokes_container}>
      <button onClick={randomJoke} className={styles.random_joke_button}>
        Ver piada aleatória
      </button>
      <div className={styles.search_box_div}>
        <SearchBox onClick={clickSearch} onChange={handleSearch} />
      </div>
      <div className={styles.form_div}>
        <form onSubmit={submit} className={styles.form_container}>
          <div className={styles.header_div}>
            <h2>Piada Personalizada</h2>
          </div>
          <Select
            name={"languages"}
            value={selectedLanguage}
            options={projectData[0]?.jokeLanguages || []}
            onChange={handleLanguage}
            text={"Selecione o idioma"}
          />
          <Select
            name={"categories"}
            value={selectedCategory}
            options={projectData[1]?.categories || []}
            onChange={handleCategory}
            text={"Selecione a categoria"}
          />
          <Radio onChange={handleType} />
          <button type="reset" className={styles.reset_button}>
            Resetar
          </button>
          <button type="submit" className={styles.submit_button}>
            Pesquisar
          </button>
        </form>
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
