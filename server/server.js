
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 3000;
const api = require('./routes/api');


app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function(req, res) {
    console.log("Connected at port " + PORT)
    res.send("Hello from server")
})

app.listen(PORT, function() {
    console.log('Running on localhost:' + PORT)
})


/*
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Matt',
  password : 'Matt',
  database : 'quote'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


//const db = new mysql.Database('quote.db');
connection.quote.insertOne(
    { userName:"admin", userPassword:"admin"}
)



const PORT = 3000
const api = require('./routes/api')

app.use('/api', api)
app.get('/', function(req, res) {
    res.send('from server')
})

app.listen(PORT, function() {
    console.log('Server running on localhost: ' + PORT)
})


/* DB Implementation *

const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'Matt',
    password : 'Matt',
    database : 'quote'
  });

connection.connect();

const port = process.env.PORT || 3000;

//const db = new mysql.Database('quote.db')


/* GraphQL Implementation */

//const graphqlHTTP = require('express-graphql')
//const { buildSchema } = require('graphql')