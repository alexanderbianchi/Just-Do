import React, { Fragment, useEffect, useState } from "react";

const InputTodo = ({token}) => {
  
  const [description, setDescription] = useState({ task: "", category: 'No Category', weekday:'General',id:token });
  const [categorys, setCategorys] = useState([]);
  
  const getCategory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sort/category?token=${token}`);
      const jsonData = await response.json();

      setCategorys(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!description.task) {
        return;
      }
      const body = { description };
      
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const buttondisplay = (desc) => {
    if (desc.category) {
      return desc.category;
    } else {
      return "No Category";
    }
  };

  const priorityDisplay = (desc) => {
    if (!desc.priority) {
      return "Priority";
    } else {
      return "!".repeat(desc.priority);
    }
  };

  let weekdays = ['General', "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayOfWeek = (desc) => {
    
    if (desc.weekday) {
      return desc.weekday;
    } else {
      
      return "Weekday";
    }
  }
  return (
    <Fragment>
      <div className="container">
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        {/* <div class="row"><div class="col-large"> */}
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
{/* </div><div class="col"> */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {buttondisplay(description)}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

            {categorys.map((cat) => (
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  value={cat.category}
                  onClick={(e) =>
                    setDescription((description) => ({
                      ...description,
                      category: e.target.value,
                      
                    }))
                  }
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
                  setDescription((description) => ({
                    ...description,
                    category: e.target.value,
                    
                  }))
                }
              />
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {priorityDisplay(description)}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() =>
                  setDescription((description) => ({
                    ...description,
                    
                    priority: 1,
                  }))
                }
              >
                !
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() =>
                  setDescription((description) => ({
                    ...description,
                    priority: 2,
                  }))
                }
              >
                !!
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() =>
                  setDescription((description) => ({
                    ...description,
                    priority: 3,
                  }))
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
            {dayOfWeek(description)}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {weekdays.map((day) => (
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  value={day}
                  onClick={(e) =>
                    setDescription((description) => ({
                      ...description,
                      weekday: day,
                    }))
                  }
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className="btn btn-success">Add</button>
        {/* </div></div> */}
      </form></div>
    </Fragment>
  );
};

export default InputTodo;
