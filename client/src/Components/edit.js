import React, { Fragment, useState, useEffect } from "react";

const EditTodo = ({ todo }) => {
  
  const [description, setDescription] = useState(todo);
 
  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { ...description };

      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  // all stuff for the buttons
  const [categorys, setCategorys] = useState([]);

  const getColumns = async (column) => {
    try {
      const response = await fetch(`http://localhost:5000/sort/${column}?token=${todo.id}`);
      const jsonData = await response.json();

      setCategorys(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getColumns("category");
  }, []);

  const priorityDisplay = () => {
    if (!description.priority) {
      return "Priority";
    } else {
      return "!".repeat(description.priority);
    }
  };
  let weekdays = [
    "General",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayOfWeek = (desc) => {
    if (desc.weekday) {
      return desc.weekday;
    } else {
      return "Weekday";
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Task</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={description.task}
                onChange={(e) =>
                  setDescription((description) => ({
                    ...description,
                    task: e.target.value,
                  }))
                }
              />

              <div class="container">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {"Category"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {categorys.map((cat) => (
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          value={cat.category}
                          onClick={() => (description.category = cat.category)}
                        >
                          {cat.category}
                        </button>
                      </li>
                    ))}
                    <li>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="New Category"
                        onChange={(e) =>
                          (description.category = e.target.value)
                        }
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {'Priority'}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => (description.priority = 1)}
                    >
                      !
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => (description.priority = 2)
                      }
                    >
                      !!
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() =>(description.priority = 3)
                      }
                    >
                      !!!
                    </button>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {'Weekday'}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {weekdays.map((day) => (
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        value={day}
                        onClick={() => (
                         description.weekday = day)
                        }
                      >
                        {day}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(description) => updateDescription(description)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
