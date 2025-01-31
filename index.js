//THIS FILE NEEDS TO BE FINISHED Y'ALL

var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser'); 
const path = require('path'); 

var app = express();
const PORT = process.env.PORT || 8080; 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      database : '113SQL',
      password : 'test'
    });
  
    connection.connect();
  
  app.post("/api/users", (req, res)=>{
    // connection.query(`USE 113SQL;`);
    const body = req.body; 
    console.log(body); 
    const sqlstmt = 'INSERT INTO users (`name`, `username`, `email`) VALUES (?,?,?)';
    let myOBJ= { name: body.name, username: body.username, email: body.email}; 
    let params = [myOBJ.name, myOBJ.username, myOBJ.email]; 
    
    connection.query(sqlstmt, params, (err) => {
      if (err) {
        console.log(err)
      }else{
        res.end('Added User'); 
        console.log('record inserted'); 
      }
    });
  }); 

connection.query('SELECT * FROM `users`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();

app.listen(PORT, () => console.log(`app started on ${PORT}`)); 

module.exports = app;