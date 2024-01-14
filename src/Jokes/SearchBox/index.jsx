import { BsSearch } from "react-icons/bs";

import styles from "./SearchBox.module.css";

export default function SearchBox({ onClick, onChange }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onClick();
    }
  }

  return (
    <div className={styles.search_box_container}>
      <input
        type="text"
        placeholder="Buscar por palavra chave"
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onClick}>
        <BsSearch />
      </button>
    </div>
  );
}
