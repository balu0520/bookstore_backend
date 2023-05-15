const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require("cors")
// const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')
// const { response } = require('express')
app.use(cors())
app.use(express.json())
// app.use(bodyParser,urlencoded({extended:true}))

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'password',
    database:'outcomes_database',
    port: 3306,
})



app.get('/get-book-items', (req,res) => {
    let getBooksQuery = "SELECT * FROM books";
    db.query(getBooksQuery,(err,result) => {
        res.send(result)
    })
})

app.post('/add-book-item', (req,res) => {
    const {author,country,language,wiki_link,title} = req.body 
    let insertBookQuery = `INSERT INTO books values('${author}','${country}','${language}','${wiki_link}','${title}')`;
    db.query(insertBookQuery,(err,result) => {
        console.log(err)
    })
    res.send("Inserted Successfully");
})


app.listen(3002,() => {
    console.log("Running on port 3002")
})
