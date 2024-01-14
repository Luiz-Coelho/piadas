import styles from "./Radio.module.css";

export default function Radio({ onChange }) {
  return (
    <fieldset className={styles.radio_container}>
      <legend>Selecione o tipo</legend>
      <div className={styles.radio_option}>
        <input
          type="radio"
          value="any"
          name="type"
          id="any"
          onChange={onChange}
        />
        <label htmlFor={"any"}>Any</label>
      </div>
      <div className={styles.radio_option}>
        <input
          type="radio"
          value="single"
          name="type"
          id="single"
          onChange={onChange}
        />
        <label htmlFor={"single"}>Single</label>
      </div>
      <div className={styles.radio_option}>
        <input
          type="radio"
          value="twopart"
          name="type"
          id="twopart"
          onChange={onChange}
        />
        <label htmlFor={"twopart"}>Two parts</label>
      </div>
    </fieldset>
  );
}
