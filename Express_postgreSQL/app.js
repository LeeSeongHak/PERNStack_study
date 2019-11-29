var express = require('express');
var app = express();
var pgp = require('pg-promise')(/*options*/);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('get안뇽');
})

var cn = {
    host: '192.168.10.100', // server name or IP address;
    port: 25432,
    database: 'user_lee',
    user: 'user_lee',
    password: 'user_lee'
};
// alternative:
// var cn = 'postgres://username:password@host:port/database';

var db = pgp(cn); // database instance;

// select and return user name from id:
db.one('SELECT * FROM staff WHERE id = $1', '1')
    .then(user => {
        console.log(user.name); // print user name;
        console.log(user.age);
    })
    .catch(error => {
        console.log(error); // print the error;
    });



app.get('/view', (req, res) => {
    db.one('SELECT product_id, product_name_ja, category_name_ja FROM VIEW05_LEE WHERE product_id = $1', 'P00000001')
    .then(user => {
        res.render('view', {productName: user.product_name_ja, categoryName: user.category_name_ja})
    })
    .catch(error => {
        console.log(error);
    }); 
})

// //SELECT product_id, product_name_ja, category_name_ja FROM VIEW05_LEE WHERE product_id = 'P00000001'
// db.one('SELECT product_id, product_name_ja, category_name_ja FROM VIEW05_LEE WHERE product_id = $1', 'P00000001')
//     .then(user => {
//         console.log(user);
//     })
//     .catch(error => {
//         console.log(error);
//     });

app.listen(3000, () => {
    console.log('server start');
});