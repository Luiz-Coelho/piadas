import styles from "./Radio.module.css";

export default function Radio({ onChange }) {
  return (
    <fieldset className={styles.radio_container}>
      <legend>Selecione o tipo</legend>
      <div className={styles.radio_option}>
        <label htmlFor={"any"}>Any</label>
        <input
          type="radio"
          value="any"
          name="type"
          id="any"
          onChange={onChange}
        />
      </div>
      <div className={styles.radio_option}>
        <label htmlFor={"single"}>Single</label>
        <input
          type="radio"
          value="single"
          name="type"
          id="single"
          onChange={onChange}
        />
      </div>
      <div className={styles.radio_option}>
        <label htmlFor={"twopart"}>Two parts</label>
        <input
          type="radio"
          value="twopart"
          name="type"
          id="twopart"
          onChange={onChange}
        />
      </div>
    </fieldset>
  );
}
