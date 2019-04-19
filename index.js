require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userController =  require( './controllers/user.js');




app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

const port = process.env.PORT;

app.post('/', (req, res) => {
    res.status(404).send('');
});

app.get('/', (req, res) => {
    res.status(200).send('test');
});

/**
 * Status code 
 * 1- success, 2 - error, 3- warning, 4- info
 */


const userControllerObj = new userController(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))