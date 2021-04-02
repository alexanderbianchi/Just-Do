const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware


app.use(cors());
app.use(express.json()); //req.body

//Login//
require('./Login')(app);


//create a todo
//
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    let time = Date.now();
    
    const newTodo = await pool.query(
      "INSERT INTO todo (task,category,priority,weekday,time,id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [description.task, description.category, description.priority,description.weekday, time,description.id]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
//
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM todo where id = ${req.query.id} ORDER BY category`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all categorys
//
app.get("/sort/:col", async (req, res) => {
  try {
    let token = req.query.token ;
    const { col } = req.params
    
    const allCats = await pool.query(
      `SELECT DISTINCT ${col} FROM todo WHERE ${col} IS NOT NULL AND id = ${token}`
    );
    
    res.json(allCats.rows);
    
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
//
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo where id=${req.query.token} ORDER BY ${id}`);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
//
app.put("/todos/:id", async (req, res) => {
  try {
    const description = req.body;
    
    await pool.query(
      "UPDATE todo SET task = $1, category=$2 ,priority=$3, checked = $4, weekday = $5, id = $6 WHERE todo_id = $7",
      [
        description.task,
        description.category,
        description.priority,
        description.checked,
        description.weekday,
        description.id,
        description.todo_id,
      ]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});
app.delete("/delete", async (req, res) => {
  try {
    await pool.query("DELETE FROM todo WHERE checked = TRUE");
    
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
