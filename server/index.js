const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");


const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => console.log('Server is running on http://localhost:4000'))

