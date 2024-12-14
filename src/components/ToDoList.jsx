import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const ToDoList = () => {
  const [listDo, setListDo] = useState("");
  const [adds, setAdds] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const handelInput = (e) => {
    setListDo(e.target.value);
  };

  const handelAdd = () => {
    if (listDo.trim() !== "") {
      setAdds([...adds, { text: listDo, completed: false }]);
      setListDo("");
    }
  };

  useEffect(() => {
    const AutoSave = localStorage.getItem("todo-list");
    if (AutoSave) {
      setAdds(JSON.parse(AutoSave));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(adds));
  }, [adds]);

  const handelActive = () => {
    const UpDate = [...adds];
    UpDate[index].completed = !UpDate[index].completed;
    setAdds(UpDate);
  };

  const ToDoOrDone = (index) => {
    setAdds((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handelEdit = (index) => {
    setEditIndex(index);
    setEditText(adds[index]);
  };

  const handelEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handelSave = () => {
    if (editText.trim() !== "") {
      const UpDate = [...adds];
      UpDate[editIndex] = editText;
      setAdds(UpDate);
      setEditIndex(null);
      setEditText("");
    }
  };

  const handelDElete = (index) => {
    const UpDate = adds.filter((_, i) => i !== index);
    setAdds(UpDate);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handelInput}
        placeholder="Додати нове завдання"
      />
      <button type="submit" onClick={handelAdd}>
        Додати
      </button>

      <ul>
        {adds.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onClick={() => handelActive(index)}
              name=""
              id=""
            />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handelEditChange}
                />
                <button type="button" onClick={handelSave}>
                  Зберегти
                </button>
              </>
            ) : (
              <>
                {task.text}
                <button type="button" onClick={() => handelEdit(index)}>
                  Редагувати
                </button>
              </>
            )}
            <button type="submit" onClick={() => handelDElete(index)}>
              Delet
            </button>
            <button onClick={() => ToDoOrDone(index)}>
              {task.completed ? "Done" : "Not Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
