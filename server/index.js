const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
    console.log('Server running')
});

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'plant_db'
});

//register new user
app.post('/register', (req, res) => {
    const sendEmail = req.body.Email;
    const sendUsername = req.body.Username;
    const sendPassword = req.body.Password;

    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';

    const Values = [sendEmail, sendUsername, sendPassword];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('User created succesfully');
            res.send({ message: 'User added!' });
        }
    });
});

//login user
app.post('/login', (req, res) => {
    const sendLoginUsername = req.body.LoginUsername;
    const sendLoginPassword = req.body.LoginPassword;

    const SQL = 'SELECT * FROM users WHERE username = ? && password = ?';

    const Values = [sendLoginUsername, sendLoginPassword];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send({ error: err });
        }

        if (results.length > 0) {
            res.send(results);
        } else {
            res.send({ message: 'Credentials don`t match!' });
        }
    });
});









