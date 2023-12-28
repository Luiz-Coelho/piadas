import { useEffect, useRef, useState } from "react";

import styles from "./RegisterForm.module.css";
import { MdCloudUpload } from "react-icons/md";
import { FaTrash, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function RegisterForm() {
  const navigate = useNavigate();

  const nameRef = useRef();

  const [profilePicture, setProfilePicture] = useState(null);
  const [showImage, setShowImage] = useState();
  const [imageName, setImageName] = useState("Upload de imagem vazio");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://piadas-backend.onrender.com/api/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        navigate("/login");
        console.log("Registro bem-sucedido!");
      } else {
        console.error("Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
    }
  };

  const clearImage = () => {
    setProfilePicture(null);
    setImageName("Upload de imagem vazio");
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
      setShowImage(URL.createObjectURL(file));
      setImageName("Upload de imagem concluído");
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    document.getElementById("profilePicture").value = null;
  }, [profilePicture]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidMatch(match);
  }, [password, confirmPassword]);

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <div className={styles.profile_picture_container}>
        <label htmlFor="profilePicture">
          {profilePicture ? (
            <img src={showImage} alt="profilePicture" />
          ) : (
            <>
              <MdCloudUpload className={styles.no_picture} />
            </>
          )}
        </label>
        {profilePicture && (
          <button className={styles.delete_btn} onClick={clearImage}>
            <FaTrash />
          </button>
        )}
        <p className={styles.file_name}>{imageName}</p>
      </div>
      <input
        id="profilePicture"
        name="profilePicture"
        type="file"
        accept="image/*"
        onChange={handleProfilePicture}
      />
      <div className={styles.input_div}>
        <label htmlFor="name">Name:</label>
        <input
          className={styles.register_input}
          id="name"
          name="name"
          type="text"
          placeholder="Luiz Felipe"
          ref={nameRef}
          autoComplete="off"
          onChange={handleName}
          value={name}
        />
      </div>
      <div className={styles.input_div}>
        <label htmlFor="email">Email:</label>
        <input
          className={styles.register_input}
          id="email"
          name="email"
          type="email"
          placeholder="example@example.com"
          autoComplete="off"
          onChange={handleEmail}
          value={email}
        />
      </div>
      <div className={styles.input_div}>
        <label htmlFor="password">
          Password:
          {validPassword && <FaCheck className={styles.valid} />}
          {!validPassword && password && <FaTimes className={styles.invalid} />}
        </label>
        <input
          className={styles.register_input}
          id="password"
          name="password"
          type="password"
          placeholder="********"
          onFocus={() => {
            setPasswordFocus(true);
          }}
          onBlur={() => {
            setPasswordFocus(false);
          }}
          onChange={handlePassword}
          value={password}
        />
        {!validPassword && passwordFocus && (
          <p className={styles.instructions}>
            <FaInfoCircle />
            <br />
            8 a 24 characteres.
            <br />
            Deve incluir letras maiúsculas e minúsculas, um número e um
            character especial.
            <br />
            Characteres especiais permitidos: ! @ # $ %
          </p>
        )}
      </div>
      <div className={styles.input_div}>
        <label htmlFor="confirmPassword">
          Confirm Password:
          {confirmPassword && validMatch && (
            <FaCheck className={styles.valid} />
          )}
          {confirmPassword && !validMatch && (
            <FaTimes className={styles.invalid} />
          )}
        </label>
        <input
          className={styles.register_input}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
          onFocus={() => {
            setConfirmPasswordFocus(true);
          }}
          onBlur={() => {
            setConfirmPasswordFocus(false);
          }}
          onChange={handleConfirmPassword}
          disabled={validPassword ? false : true}
          value={confirmPassword}
        />
        {confirmPasswordFocus && !validMatch && (
          <p className={styles.instructions}>
            <FaInfoCircle />
            As senhas devem ser iguais
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={validPassword && validMatch ? false : true}
      >
        Criar Conta
      </button>
    </form>
  );
}
