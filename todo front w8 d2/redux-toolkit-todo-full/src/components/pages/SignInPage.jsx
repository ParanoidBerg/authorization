import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./pages.module.css";
import { authorizate } from "../../features/authSlice";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();

  const signingIn = useSelector((state) => state.auth.signingIn);
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
      dispatch(authorizate({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <>
      <div className={styles.join}>
        <div className={styles.userName}></div>
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
          <h1>Вход</h1>
          <input
            type="text"
            value={login}
            onChange={handleSetLogin}
            className={styles.login}
            placeholder="Логин"
          ></input>
          <input
            className={styles.password}
            type="password"
            value={password}
            onChange={handleSetPassword}
            placeholder="Пароль"
          ></input>
          <button
            disabled={signingIn}
            className={signingIn ? styles.btnOff : styles.btn}
            onClick={handleSubmit}
          >
            Войти
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
              <div className={styles.fullf}>Вход выполнен</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignInPage;
