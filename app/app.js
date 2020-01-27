require('dotenv').config();

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("process.env", process.env)
const port = process.env.PORT || 8080;

const router = require('./routes/v1/');
app.use('/api/v1/', router);

app.listen(port);
console.log('listen on port ' + port);
