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
const cors = require('cors');

//Hidden passkeys
require('dotenv/config')

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const api = require('./api');

const { graphqlHTTP } = require('express-graphql');

const resolvers = require('./GraphQL/resolvers');
const schema = require('./schema');

//Setup the express server
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
app.get('/', function (req, res) {
  console.log("Connected at port " + PORT)
  res.send("Hello from server")
})

//Connect to primary database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const database = mongoose.connection;

database.on('error', (error) => { console.log(error) });
database.once('connected', (res) => {
  console.log("Database connected.");
});

//Open connection
app.listen(PORT, function () {
  console.log('Running on localhost:' + PORT)
})

//Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'));
    console.log(res);
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

exports.handler = app;
