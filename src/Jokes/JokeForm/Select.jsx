import styles from "./Select.module.css";

export default function Select({ text, name, options, onChange, value }) {
  return (
    <div className={styles.select_div}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={onChange} value={value || ""}>
        <option>Selecione uma opção</option>
        {options &&
          options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}
