import React, { Fragment, useState, useEffect } from "react";

const Checkbox = (todo) => {
  const check = async (e) => {
    e.preventDefault();
    try {
      const body = { ...todo.todo, checked: !todo.todo.checked };

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
  
  if (todo.todo.checked) {
    return (
      <Fragment>
        <input type="checkbox" onClick={(e) => check(e)} checked />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <input type="checkbox" onClick={(e) => check(e)} />
      </Fragment>
    );
  }
};

export default Checkbox;
