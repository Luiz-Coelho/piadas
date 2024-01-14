import { useEffect, useState } from "react";
import styles from "./JokeForm.module.css";
import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Loading from "../../components/Loading";

export default function JokeForm({ handleSubmit, getData }) {
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
  );
}
