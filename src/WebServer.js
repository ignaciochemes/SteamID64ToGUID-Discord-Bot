const bodyParser = require('body-parser');
const express = require('express');

class WebServer {
    constructor() {
        this.app = express();
        this.port = process.env.API_PORT || 3000;
        this.prefix = '/api/v1';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(this.prefix, require('./Routes/ApiRouter'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`API Server on port: ${parseInt(this.port)}`);
        })
    }
}

module.exports = { WebServer };