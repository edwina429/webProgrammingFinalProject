require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const {Pool} = require('pg');
const app = express();
const port = process.env.PORT || 3000;
const {Sequelize, DataTypes} = require("sequelize");
const { ConstantColorFactor } = require("three");
app.use(cors());
app.use(express.json());  


const cors = require("cors");
app.use(
  cors({
    origin: "https://webprogrammingfinalprojectbeta.onrender.com/",
  })
);


const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  
  sequelize
    .sync()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });

    const students = sequelize.define("studentsInfo", {
      id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true
      },
      name : {
        type : DataTypes.STRING,
        allowNull : true
      },
      password : {
        type : DataTypes.STRING,
        allowNull : true
      },
      email : {
        type : DataTypes.STRING,
        allowNull : true
      },
      balance : {
        type : DataTypes.DECIMAL,
        allowNull : true
      }
    });

app.post("/addStudent", async(req, res) => {
  try{
    const {name, password, email, balance} = req.body
    const id = 1
    console.log(req.body)
    const newStudent = await students.create({name, password, email,balance});
    console.log("NEW STUDENT INSERTED")
    res.json(newStudent) 
  }catch (err){
    console.log(err)
  }
});

app.post("/verifyUser", async(req, res) => {
  try{
    const userInput = req.body
    const allUsers = await students.findAll({
      where : {name : "ed" }
    });
    console.log("**user sent username", userInput.username)
    console.log("**user sent password", userInput.password)
    console.log("***allusersname", JSON.stringify(allUsers[0].name))
    console.log("***allusersnamePassword", JSON.stringify(allUsers[0].password))
    console.log("***NONJSON", allUsers[0].name)

    if(JSON.stringify(userInput.username) == JSON.stringify(allUsers[0].name) && 
       JSON.stringify(userInput.password) == JSON.stringify(allUsers[0].password)){
        console.log("correct login, sending 200")
        res.status(200).send()
    }
    else{
      console.log("inccorrect login, sending 404")
      res.status(404).send()
    }    
  }
  catch (err){
    console.log(err)
    res.status(404).send()
  }
  
});

// const pool = new Pool({
//     user : 'e',
//     host : 'localhost',
//     database : 'studentlogin',
//     password : '630487', 
//     port : 5432,
// });
    
// pool
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to PostgreSQL database');
// 	})
// 	.catch((err) => {
// 		console.error('Error connecting to PostgreSQL database', err);
// 	});


// // Query to retrieve all rows from data
// // JUST FOR TESTING, UNCOMMENTING WILL FLOOD TERMINAL.
// // pool.query('SELECT * FROM studentaccounts', (err, result) => {
// //     if (err) {
// //         console.error('Error executing query', err);
// //     } else {
// //         console.log('Query result:', result.rows);
// //     }
// // });    

// // Route for adding users to the table for signUp.
// app.post("/addUser", async(req, res) => {
//     const data = req.body
//     console.log("object sent when submitting : ", req.body)
//     const floatingBalance = parseFloat(data.balance);
//     await pool.query("INSERT INTO studentaccounts (username, password, email, balance) VALUES ($1, $2, $3, $4)", [data.username, data.password, data.email, floatingBalance])
//     res.status(200).send()
//   });

// query database for login validation, returns 200 status if password mathces login.
// app.post("/usersLogin", async (req, res) => {
//     const userData = req.body
//     console.log("*****information of user when hitting login  :" , userData)
//     pool.query("SELECT * FROM studentaccounts WHERE username = $1", [userData.username], (err, result) => {
//         if (err) {
//             console.error('Error executing query', err);
//         } else {
//             console.log('Query result:', result.rows);
//         }
//     const retrievedUser = result.rows
//     if(retrievedUser.length > 0){
//         if(retrievedUser[0].password == userData.password){
//             res.status(200).send()
//         }
//         else
//             res.status(400).send()
//         }
//     // case to catch an empty query meaning no username was found. 
//     else{
//         res.status(400).send()
//     }
//     }); 

//   });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


// app.get('/home', (req, res) => {    
//     res.send('Hello home!');
// });



app.listen(4090, () => console.log(`Server is running on http://localhost:${port}`))

