const express = require("express");
const {
    addTodo,
    gettodos,
    deleteTodo,
    updateTodo,
} = require("./db");

const app = express();
const bodyParser = require("body-parser");
const port = 3002;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());





app.post("/post", (req, res) => {
  const todo = req.body.todo;
  addTodo(todo, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/getTodos", (req, res) => {
  gettodos((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  deleteTodo(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateTodo/:id", (req, res) => {
  const todo = req.body.todo;
  const id = req.params.id;
  updateTodo([todo, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});