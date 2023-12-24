import styles from "./Checkbox.module.css";

export default function Checkbox({ options, onChange, legend }) {
  return (
    <fieldset className={styles.checkbox_field}>
      <legend>{legend}</legend>
      {options.map((option) => (
        <div key={option}>
          <label>
            {option}
            <input
              type="checkbox"
              name={option}
              id={option}
              onChange={onChange}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
