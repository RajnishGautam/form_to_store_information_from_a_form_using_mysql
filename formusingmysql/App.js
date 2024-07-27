//formusingmysql>App.js
//becrypt works on blowfish cipher algorithm
//portfolio>App.js
//run App.js file and open localhost:3000 in browser
//this code is to store password by encrypting it
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); //module for encryption

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'information')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rajnish'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.post('/add-user', (req, res) => {
  let { name, email, suggestion, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => { // Hashing the password
    if (err) {
      return res.status(500).send('Error in hashing password');
    }
    let sql = 'INSERT INTO information (name, email, suggestion, password) VALUES(?,?,?,?)';
    db.query(sql, [name, email, suggestion, hashedPassword], (err, result) => { // Storing the hashed password
      if (err) {
        return res.status(500).send('Error in inserting the data');
      }
      res.send('Data inserted successfully');
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

