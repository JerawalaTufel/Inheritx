const express = require('express');
const Connection = require('./src/config/dbConnection');
const apiRoutes = require('./src/routes');
const cors = require('cors')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000
Connection()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))