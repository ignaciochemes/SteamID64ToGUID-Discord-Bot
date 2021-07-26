const path = require('path');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const BotClient = require('../index');
const { Server } = require('socket.io');
//const passport = require('./passport');
const session = require('express-session');
const exhbs = require('express-handlebars');
const { DatabaseConnection } = require('./database/dbConnection');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const SocketIoFunctions = require('./utils/socketIoFunctions')(io);

class ServerExpress {
    static _instancia;
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.connectarDb();
        this.port = process.env.PORT || 80;
        this.middlewares();
        this.static();
        this.routes();
        this.run();
        //this.socketIo();
    }
    
    static getInstancia() {
        if(!ServerExpress._instancia) {
            ServerExpress._instancia = new ServerExpress();
        }
        return ServerExpress._instancia;
    }
    
    async connectarDb() {
        await DatabaseConnection.getInstance();
    }
    
    middlewares() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(session({
            secret: "anibalfernandez",
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((req, res, next) => { req.BotClient = BotClient; next(); });
        //this.app.use(passport.initialize());
        //this.app.use(passport.session());
    }
    
    static socketIo() {
        // setInterval(() => {
        //     SocketIoFunctions.discordStats(this.io)
        //     SocketIoFunctions.ping(this.io)
        // }, 5000);
        SocketIoFunctions.stats();
    };

    static() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', '.hbs');
        this.app.engine('.hbs', exhbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));
    }


    routes() {
        this.app.use('/', require('./route/routing'));
    }

    run() {
        this.app.listen(this.port, (err) => {
            if(err) console.log(err);
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

module.exports = { ServerExpress };