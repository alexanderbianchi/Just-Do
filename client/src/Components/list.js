import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./edit";
import Checkbox from "./Checkbox";

const ListTodos = ({ token }) => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteChecked = () => {
    try {
      fetch(`http://localhost:5000/delete`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.checked !== true));
    } catch (err) {
      console.error(err.message);
    }
  };

  //get and sort todos
  const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos?id=${token}`);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const sortTodos = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/todos?token=${token}/${category}`
      );
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //category todos
  const [sortBy, setSort] = useState([]);
  const [variable, setVariable] = useState(sessionStorage.getItem("sortBy"));

  const getColumns = async (col) => {
    try {
      const response = await fetch(
        `http://localhost:5000/sort/${col}?token=${token}`
      );
      const jsonData = await response.json();

      setSort(() => jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFirst();
  }, []);

  const getFirst = () => {
    const cat = sessionStorage.getItem("sortBy");

    if (!cat) {
      sessionStorage.setItem("sortBy", "checked");
      setVariable("checked");
      getColumns("checked");

    } else {
      setVariable(() => cat);
      getColumns(cat);
    }
  };
  function setVar() {

    let array = ["checked", "weekday", "category"];
  
    let index =
      (array.length + array.findIndex((x) => x === variable) + 1) %
      array.length;

    sessionStorage.setItem("sortBy", array[index]);
    setVariable(() => array[index]);
    getColumns(array[index]);
  }
  return (
    <Fragment>
      <div className="container">
        <div class="d-flex justify-content-center mt-3">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => setVar()}
          >
            Sorted by: {variable}
          </button>

          <button
            type="button"
            class="btn btn-danger"
            onClick={() => deleteChecked()}
          >
            Delete Checked
          </button>
        </div>{" "}
        {sortBy.map((day) => {
          return (
            <div>
              <h4>{day[variable]}</h4>
              <table className="table mt-5 text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <a onClick={() => sortTodos("time")}>Task</a>
                    </th>
                    <th>
                      <a onClick={() => sortTodos("Category")}>Category</a>
                    </th>
                    <th>
                      <a onClick={() => sortTodos("priority")}>Priority</a>
                    </th>
                    <th>
                      <a onClick={() => sortTodos("weekday")}>Weekday</a>
                    </th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => {
                    if (!todo.checked && todo[variable] === day[variable]) {
                      return (
                        <tr key={todo.todo_id}>
                          <td>
                            <Checkbox todo={todo} />
                          </td>
                          <td>{todo.task}</td>
                          <td>{todo.category}</td>
                          <td>{"!".repeat(todo.priority)}</td>
                          <td>{todo.weekday}</td>
                          <td>
                            <EditTodo todo={todo} />
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteTodo(todo.todo_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                  {todos.map((todo) => {
                    if (todo.checked && todo[variable] === day[variable]) {
                      return (
                        <tr key={todo.todo_id}>
                          <td>
                            <Checkbox todo={todo} checked={true} />
                          </td>
                          <td>
                            <s>{todo.task}</s>
                          </td>
                          <td>
                            <s>{todo.category}</s>
                          </td>
                          <td>
                            <s>{"!".repeat(todo.priority)}</s>
                          </td>
                          <td>
                            <s>{todo.weekday}</s>
                          </td>
                          <td>
                            <s>
                              <EditTodo todo={todo} />
                            </s>
                          </td>
                          <td>
                            <s>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}
                              >
                                Delete
                              </button>
                            </s>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ListTodos;
