require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const port = process.env.PORT;

app.post('/', (req, res) => {
    res.status(404).send('');
});

app.get('/', (req, res) => {
    res.status(404).send('');
});
/*To register the user*/
app.post('/registerUser', (req, res) => {
    console.log(req.body);
    res.status(200).send({statusCode: 200, statusText: "Registration Completed"});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))