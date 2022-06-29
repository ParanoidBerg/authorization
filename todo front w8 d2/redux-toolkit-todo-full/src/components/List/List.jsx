import styles from "./list.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeTodos, delTodos, getTodos } from "../../features/todoSlice";
import { useEffect } from "react";

const List = () => {

  const handleSetChecked = (id) => {
    
    dispatch(changeTodos(id));
  };

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state)=> state.loading)

  const dispatch = useDispatch();

  const handleDel = (id) => {
    dispatch(delTodos(id));
  };
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className={styles.list}>
        {loading && <div className={styles.loader}>...loading</div>}
      {todos.map((element, index) => {
        return (
          <div key={index} className={element.completed ? styles.completed : styles.task}>
            {" "}
            <button
              onClick={() => handleSetChecked(element)}
              className={element.completed ? styles.favSelected : styles.fav}
            >
              ★
            </button>{" "}
            {element.text}
            <button onClick={() => handleDel(element)} className={styles.del}>
              X
            </button>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default List;
