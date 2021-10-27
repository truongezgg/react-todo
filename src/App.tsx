import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const STATUS = {
  ACTIVE: 1,
  COMPLETED: 0,
};

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Pay electric bill", status: STATUS.ACTIVE },
    { id: 2, name: "Walk the dog", status: STATUS.COMPLETED },
  ]);

  const getToggleAllStatus = () => {
    return todos.every((item) => item.status === STATUS.ACTIVE);
  };
  const [toggleAll, setToggleAll] = useState(getToggleAllStatus());

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const item = todos.find((el) => el.id === id);
    if (item) {
      item.status = Number(e.target.checked);
      setTodos([...todos]);
    }
    setToggleAll(getToggleAllStatus());
  };

  const handleChangeToggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setTodos(todos.map((item) => ({ ...item, status: Number(isChecked) })));
    setToggleAll(isChecked);
  };

  const removeItem = (id: number) => () => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const addItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const name = e.currentTarget.value;
      setTodos([
        ...todos,
        { id: Date.now(), name: name, status: STATUS.COMPLETED },
      ]);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className={styles.TodoWrapper}>
      <div className={styles.TodoApp}>
        <header className={styles.Header}>Todos</header>
        <section className={styles.Main}>
          <input
            type="checkbox"
            checked={toggleAll}
            onChange={handleChangeToggleAll}
          />
          <input
            type="text"
            name="NewTodo"
            id="NewTodo"
            placeholder="What needs to be done?"
            onKeyDown={(e) => addItem(e)}
          />

          <ul className={styles.TodoList}>
            {todos.map((item) => (
              <li className={styles.ToDoItem} key={item.id}>
                <div className={item.status ? styles.LineThrough : ""}>
                  <input
                    type="checkbox"
                    name={String(item.id)}
                    checked={Boolean(item.status)}
                    onChange={(e) => {
                      handleChangeStatus(e, item.id);
                    }}
                  />
                  {item.name}
                </div>
                <button
                  className={styles.DestroyItem}
                  onClick={removeItem(item.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.Footer}>
          <div className={styles.TodoCount}>Total: {todos.length}</div>
          <ul className={styles.Filter}>
            <li className={styles.FilterAll}>All</li>
            <li className={styles.FilterActive}>Active</li>
            <li className={styles.FilterCompleted}>Completed</li>
          </ul>
        </footer>
      </div>

      <footer>Nguyen Duy Truong</footer>
    </div>
  );
}

export default App;
