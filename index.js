require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userModal =  require( './modals/user-modal.js');


let userModalObj = new userModal();

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
app.post('/register-user', (req, res) => {
    let params = req.body;
    let userObject = {...req.body};
    let response = {statusCode: 3, statusText: "User details already exists"};

    let result = userModalObj.addUser(userObject);

    if(result && result !== undefined){
        response = {statusCode: 1, statusText: "Registration Completed"}
    }
    res.status(200).send(response);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))