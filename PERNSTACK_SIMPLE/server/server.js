const express = require('express');
const app = express();
var pgp = require('pg-promise')(/*options*/);

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var cn = {
    host: '192.168.10.100',
    port: 25432,
    database: 'user_lee',
    user: 'user_lee',
    password: 'user_lee'
};

var db = pgp(cn);

app.get('/express_backend', (req, res) => {
    db.one('SELECT product_id, product_name_ja, category_name_ja FROM VIEW05_LEE WHERE product_id = $1', 'P00000001')
    .then(user => {
        res.send({productName: user.product_name_ja, categoryName: user.category_name_ja})
    })
    .catch(error => {
        console.log(error);
    }); 
})

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });