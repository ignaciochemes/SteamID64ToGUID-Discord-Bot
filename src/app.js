const morgan = require('morgan');
const express = require('express');
const app = express();
const puerto = 3000;

//Start Express server - Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('src'))
//Start Express server - Routes
//app.use(require('./routes/tasks.routes'));
//app.use(express.static('src'));

app.listen(puerto, () => {
    console.log(`Express listen in port ${puerto}`);
});

module.exports = app;