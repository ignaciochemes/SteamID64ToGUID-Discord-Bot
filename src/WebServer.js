const bodyParser = require('body-parser');
const express = require('express');
const logger = require('./Middlewares/LoggerMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

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
        this.app.use(logger);
    }

    routes() {
        this.app.use(this.prefix, require('./Routes/ApiRouter'));
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`API Server on port: ${parseInt(this.port)}`);
        })
    }
}

module.exports = { WebServer };