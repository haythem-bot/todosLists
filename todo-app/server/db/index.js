const mysql = require("mysql2");
const createTables = require("./config");
const Promise = require("bluebird");
const database = "todoApp";

const connection = mysql.createConnection({
    user: "root",
    password: "root",
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

const addTodo = (todo, callback) => {
    const sql = "INSERT INTO todos (todo) VALUES (?) ;";
    connection.query(sql, [todo], (err, result) => {
        callback(err, result);
    });
};

const deleteTodo = (id, callback) => {
    const sql = "DELETE FROM todos WHERE id  = ? ";
    connection.query(sql, id, (err, result) => {
        callback(err, result);
    });
};

const gettodos = (callback) => {
    const sql = "SELECT * FROM todos";
    connection.query(sql, (err, result) => {
        callback(err, result);
    });
};

const updateTodo = (todo, id, callback) => {
    const sql = "UPDATE todos SET todo = ? WHERE id = ? ;";
    connection.query(sql, todo, id, (err, result) => {
        callback(err, result);
    });
};



db.connectAsync()
    .then(() =>
        console.log(`Connected to ${database} database as ID ${db.threadId}`)
    )
    .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
    .then(() => db.queryAsync(`USE ${database}`))
    .then(() => createTables(db));

module.exports = {
    addTodo,
    gettodos,
    deleteTodo,
    updateTodo,

};