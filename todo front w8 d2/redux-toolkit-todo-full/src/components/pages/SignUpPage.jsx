import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./pages.module.css";
import { createUser } from "../../features/authSlice";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const signingUp = useSelector((state) => state.auth.signingUp);
  const error = useSelector((state) => state.auth.error);
  const fullf = useSelector((state) => state.auth.isFullf);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (login !== "" && password !== "") {
      dispatch(createUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={styles.join}>
      <div className={styles.links}>
        <Link to="/" className={styles.home}>
          Главная
        </Link>
        <Link to="/SignUpPage" className={styles.signUp}>
          Регистрация
        </Link>
        <Link to="/SignInPage" className={styles.signIn}>
          Войти
        </Link>
      </div>
      <div className={styles.border}>
        <h1>Регистрация</h1>
        <input
          type="text"
          value={login}
          onChange={handleSetLogin}
          className={styles.login}
          placeholder="Логин"
        ></input>
        <input
          type="password"
          value={password}
          onChange={handleSetPassword}
          className={styles.password}
          placeholder="Пароль"
        ></input>
        <button
          onClick={handleSubmit}
          disabled={signingUp}
          className={signingUp ? styles.btnOff : styles.btn}
        >
          Зарегистрироваться
        </button>
        {error && (
          <div className={styles.errorCnt}>
            {" "}
            <div className={styles.error}>{error}</div>
          </div>
        )}
        {fullf && (
          <div className={styles.fullfCnt}>
            {" "}
            <div className={styles.fullf}>Вы успешно зарегестрированы</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
