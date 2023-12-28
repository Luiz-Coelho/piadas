import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { MdCloudUpload } from "react-icons/md";
import { FaTrash, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

import styles from "./UserProfileForm.module.css";

const s3Url = import.meta.env.VITE_S3_URL;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function UserProfileForm() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    fetch(`https://piadas-backend.onrender.com/api/user/${user._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserData(data);
        setName(data.name);
        setEmail(data.email);
        setProfilePicture(data.profilePicture);
        setShowImage(`${s3Url}${user.profilePicture}`);
      })
      .catch((error) => console.log(error));
  }, [user._id]);

  const isUnchanged = () => {
    return (
      profilePicture === userData.profilePicture &&
      name === userData.name &&
      email === userData.email &&
      password === ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (profilePicture !== userData.profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    if (name !== userData.name) formData.append("name", name);
    if (email !== userData.email) formData.append("email", email);
    if (password !== userData.password && password !== "")
      formData.append("password", password);

    try {
      const response = await fetch(
        `https://piadas-backend.onrender.com/api/user/${user._id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/");
        console.log("Edição bem-sucedida!");
      } else {
        console.error("Erro ao editar");
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
          className={styles.edit_input}
          id="name"
          name="name"
          type="text"
          placeholder="Luiz Felipe"
          autoComplete="off"
          onChange={handleName}
          value={name}
        />
      </div>
      <div className={styles.input_div}>
        <label htmlFor="email">Email:</label>
        <input
          className={styles.edit_input}
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
          className={styles.edit_input}
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
          className={styles.edit_input}
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
          value={confirmPassword}
          disabled={validPassword ? false : true}
        />
        {confirmPasswordFocus && !validMatch && (
          <p className={styles.instructions}>
            <FaInfoCircle />
            As senhas devem ser iguais
          </p>
        )}
      </div>
      <button type="submit" disabled={isUnchanged()}>
        Editar Perfil
      </button>
    </form>
  );
}
