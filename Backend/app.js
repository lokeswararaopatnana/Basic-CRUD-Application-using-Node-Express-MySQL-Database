const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1202',
    database: 'cruddb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

// CRUD Routes (Example for a 'users' table)

// Creating New user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User created' });
        console.log("New User Created!")
    });
  });

// Reading all users
app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results)
    });
});

// Reading a single user based on id
app.get("/user/:id", (req,res)=>{
    const {id} = req.params
    db.query('SELECT * FROM users WHERE id = ?',[id],(err,result)=>{
        if (err) throw err;
        res.json(result)
        console.log(result)
    })
})

// Deleting a single user based on id
app.delete("/user/:id", (req,res)=>{
    const {id} = req.params
    db.query('DELETE FROM users where id = ?',[id],(err,result)=>{
        if (err) throw err;
        res.json({message:"User Deleted!"})
        console.log("User Deleted!")
    })
})

// ... Add other CRUD routes for POST, PUT, DELETE

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Server is running at http://localhost:${port}/`)
});