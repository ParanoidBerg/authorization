import styles from "./list.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeTodos, delTodos, getTodos } from "../../features/todoSlice";
import { useEffect } from "react";
import { logOut } from "../../features/authSlice";

const List = () => {
  const handleSetChecked = (id) => {
    dispatch(changeTodos(id));
  };

  const todos = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.todo.loading);
  const error = useSelector((state) => state.todo.error);
  console.log(error);
  const dispatch = useDispatch();

  const handleDel = (id) => {
    dispatch(delTodos(id));
  };
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      {error && (
        <div className={styles.errCnt}>
          <div className={styles.err}>{error}</div>
        </div>
      )}
      <div className={styles.list}>
        {loading && <div className={styles.loader}>...loading</div>}
        {todos &&
          todos.map((element, index) => {
            return (
              <div
                key={index}
                className={element.completed ? styles.completed : styles.task}
              >
                <button
                  onClick={() => handleSetChecked(element)}
                  className={
                    element.completed ? styles.favSelected : styles.fav
                  }
                >
                  ★
                </button>{" "}
                {element.text}
                <button
                  onClick={() => handleDel(element)}
                  className={styles.del}
                >
                  X
                </button>{" "}
              </div>
            );
          })}
      </div>
      <button onClick={handleLogOut} className={styles.logOut}>
        Выйти
      </button>
    </>
  );
};

export default List;
