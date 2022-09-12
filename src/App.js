import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/form';
import "./App.css";


function App() {

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUptadesTodo] = useState("");

  useEffect(() => {
    const todosFormlocalStorage = localStorage.getItem("todos");
    console.log(todosFormlocalStorage);
    if (todosFormlocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
      setTodos(JSON.parse(todosFormlocalStorage));
    }
  }, []);


  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const uptadesTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter(item => item.id !== id);
    setTodos([uptadesTodo, ...filteredTodos]);
    localStorage.setItem("todos", JSON.stringify(
      [uptadesTodo, ...filteredTodos])
    );
  };

  const deleteTodo = (id) => {
    console.log(id);
    const filteredTodos = todos.filter(item => item.id !== id)
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo empty!");
      return;
    }
    const hasTodos = todos.find(item => item.text === todoText)
    console.log(hasTodos);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    }

    if (isEdit === true) {
      console.log(willUpdateTodo, "Todo yu güncelle");
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const uptadesTodo = {
        ...searchedTodo,
        text: todoText
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([uptadesTodo, ...filteredTodos,]);
      setTodoText("");
      setIsEdit(false);
      setWillUptadesTodo("");
      localStorage.setItem("todos", JSON.stringify(
        [...filteredTodos, uptadesTodo])
      );
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };

      console.log("newTodo", newTodo);
      setTodos([newTodo, ...todos]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTodoText("");
    }
  };


  return (
    <div id='appContainer' className="container py-2 rounded">
      <h1 id='baslik' className="text-center my-5">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />
      {todos.length <= 0 ? (
        <p id='todoYet' className='text-center my-5'> You don't have any todos yet.</p>
      ) : (
        <>
          {todos.map(item => (
            <Todo
              item={item}
              deleteTodo={deleteTodo}
              setIsEdit={setIsEdit}
              setWillUpdateTodo={setWillUptadesTodo}
              setTodoText={setTodoText}
              changeIsDone={changeIsDone}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;