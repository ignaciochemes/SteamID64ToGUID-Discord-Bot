class SocketIoFunctions {
    constructor(){}

    static async discordStats(io) {
        const data = require('../../index');
        let datainfo = { 
            infousername: data.username,
            infousers: data.users + "k",
            infoguilds: data.guilds
        }
        return io.emit("datainfo", datainfo);
    };

    static async ping(io) {
        const ping = require('ping');
        let res1 = await ping.promise.probe('cloudflare.com', { timeout: 2 });
        let res2 = await ping.promise.probe('89.255.2.229', { timeout: 2 });
        let res3 = await ping.promise.probe('165.87.201.244', { timeout: 2 });
        var data = {
            latam: Math.floor(res1.avg),
            eu: Math.floor(res2.avg),
            usa: Math.floor(res3.avg)
        }
        return io.emit("ping", data);
    };

    static async stats(io) {
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
            return io.emit("srv-stats",data);
        });
    };
};

module.exports = { SocketIoFunctions };