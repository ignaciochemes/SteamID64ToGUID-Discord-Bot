const path = require('path');
const exhbs = require('express-handlebars');
const morgan = require('morgan');
const express = require('express');

const app = express();
const socketio = require('socket.io');

//Comienza la configuracion de express + SocketIo
const server = require('http').Server(app);
const io = socketio(server);

//Opciones de Express
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Express Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//Rutas de Express - Donde estan
app.use('/', require('./route/routing'));
//Directorio publico
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});

setInterval(discordStats, 5000);
async function discordStats() {
    const data = require('../index');
    let datainfo = { 
        infousername: data.username,
        infousers: data.users,
        infoguilds: data.guilds
    }
    io.emit("datainfo", datainfo);
};

setInterval(ping, 5000)
//Funcion de ping
async function ping() {
    const ping = require('ping');
    let res1 = await ping.promise.probe('cloudflare.com', {
        timeout: 2,
    });
    let res2 = await ping.promise.probe('89.255.2.229', {
        timeout: 2,
    });
    let res3 = await ping.promise.probe('165.87.201.244', {
        timeout: 2,
    });
    var data = {
        latam: Math.floor(res1.avg),
        eu: Math.floor(res2.avg),
        usa: Math.floor(res3.avg)
    }
    io.emit("ping", data);
}

//Funcion de systema
setInterval(stats, 1000)
function stats(){  
    const os = require("os"),
        osur = require("os-utils");
    
    osur.cpuUsage(function(v){
      let ut_sec = os.uptime(); 
      let ut_min = ut_sec/60; 
      let ut_hour = ut_min/60; 
        
      ut_sec = Math.floor(ut_sec); 
      ut_min = Math.floor(ut_min); 
      ut_hour = Math.floor(ut_hour); 
        
      ut_hour = ut_hour%60; 
      ut_min = ut_min%60; 
      ut_sec = ut_sec%60;
        var data =  {
            status:"ok",
            sysUptime : `${ut_hour}:${ut_min}:${ut_sec} hs`,
            cpuUsage : Math.round(v*1000)/10+"%",
            memUsage: Math.floor((os.totalmem() - os.freemem())/os.totalmem()*1000)/10+"%"
        }
        io.emit("srv-stats",data);
    });
};
module.exports = {app: app, server: server};