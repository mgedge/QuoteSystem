/***************************************************
 * server.js
 * 
 * This file creates the backend service for the application
 * 
 * When run, using 'node server' or 'nodemon server',
 * the user will be able to log-in. Without it, the API
 * calls would do nothing. This file would be run on the 
 * home server users to connect to.
 * 
 **************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Hidden passkeys
require('dotenv/config')

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const api = require('./routes/api');

const { graphqlHTTP } = require('express-graphql');

const resolvers = require('./GraphQL/resolvers');
const schema = require('./GraphQL/schema');

const mysql = require('mysql');

//Setup the express server
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(cors());


//Open graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

//Establish the api endpoint
app.use('/api', api);

//Connect to the server
app.get('/', function(req, res) {
    console.log("Connected at port " + PORT)
    res.send("Hello from server")
})

//Connect to mongoose (middleman for API)
mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true }, () => 
  console.log("Connected to database through server.js")
)

//Connect to external server
const external = mysql.createConnection({
  host: 'blitz.cs.niu.edu',
  port: '3306',
  database: 'csci467',
  user: 'student',
  password: 'student'
});

external.connect(function(err) {
  if(err) throw err;

  else console.log("Successfully connected to the external server");

  // external.query("SELECT * FROM customers", function(err, result, fields) {
  //   if(err) throw err;
  // })
})

//Open connection
app.listen(PORT, function() {
    console.log('Running on localhost:' + PORT)
})

//Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});