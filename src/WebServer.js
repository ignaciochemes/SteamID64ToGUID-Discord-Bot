import bodyParser from 'body-parser';
import express from 'express';
import logger from './Middlewares/LoggerMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import apiRouter from './Routes/ApiRouter.js';

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
        // Registra el router principal de la API usando import ESM
        this.app.use(this.prefix, apiRouter);
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`API Server on port: ${parseInt(this.port)}`);
        })
    }
}

export default { WebServer };
