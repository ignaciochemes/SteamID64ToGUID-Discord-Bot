const morgan = require('morgan');
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
const puerto = 3000;

//Import Routes
const rutas = require('./src/routes/rutas');

//Start Express server - Middleware
//app.use(express.static('src'));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views'));

//Middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tatin'
}, 'single'));

// Routes
app.use('/', rutas);

// Statics Files
app.use(express.static(path.join(__dirname, './src/public')));

app.listen(puerto, () => {
    console.log(`Express listen in port ${puerto}`);
});

module.exports = app;