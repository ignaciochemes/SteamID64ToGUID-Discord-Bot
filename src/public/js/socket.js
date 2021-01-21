const socket = io();

socket.on("srv-stats", (data) => {
    var dataChart = window.chart.chart.data.datasets,
            cpuUsage = dataChart[0],
            memUsage = dataChart[1];
    var sysUptime = $("#sysUptime");
    var sysRam = $("#sysRam");
    var sysUsage = $("#sysCpu");
    try {
        sysUptime.empty().append(
            `<h3>${data.sysUptime}</h3>`
        );
        sysRam.empty().append(
            `<h3>${data.memUsage}</h3>`
        );
        sysUsage.empty().append(
            `<h3>${data.cpuUsage}</h3>`
        );
        var d = Date.now();
            cpuUsage.data.push({
                x: d,
                y: parseInt(data.cpuUsage)
            });
            memUsage.data.push({
                x: d,
                y: parseInt(data.memUsage)
            });

            window.chart.update();
        
    } catch(err){console.log(err)}
});
// build Chart
var ctx = document.getElementById("chart").getContext('2d');
window.chart = new Chart(ctx, {
    type: 'line',
    data: { 
        datasets: [
            {
                data: [{x:Date.now(),y:0}],
                label: 'Cpu Usage',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                data: [{x:Date.now(),y:0}],
                label: 'Memory Usage',
                borderColor: 'rgb(255, 202, 40)'
            }
        ] 
    },
    options: { 
        title: {
            display: true,
            text: 'Server Stats',
            position: "top",
            fontStyle: "bold",
            fontSize: 16
        },
        scales: { xAxes: [{
            type: 'realtime'
        
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Percent (%)'
            }
        }]
    } 
}
});

socket.on("ping", (data) => {
    var pingLatam = $("#pingLatam");
    var pingEu = $("#pingEu");
    var pingUsa = $("#pingUsa");
    try {
        pingLatam.empty().append(
            `<h7><font size="3" color="#383838">${data.latam}</font> MS to Latam</h7>`
        );
        pingEu.empty().append(
            `<h7><font size="3" color="#383838">${data.eu}</font> MS to Europe</h7>`
        );
        pingUsa.empty().append(
            `<h7><font size="3" color="#383838">${data.usa}</font> MS to USA</h7>`
        );
    } catch {
        (err)
        console.log(err);
    }
});

socket.on("datainfo", (datainfo) => {
  var dataUsername = $("#dataUsername");
  var dataUsers = $("#dataUsers");
  var dataGuilds = $("#dataGuilds");
  try {
      dataUsername.empty().append(
          `<h7><font size="3" color="#383838">${datainfo.infousername}</font> is my name!</h7>`
      );
      dataUsers.empty().append(
          `<h7><font size="3" color="#383838">${datainfo.infousers}</font> Online users cached!</h7>`
      );
      dataGuilds.empty().append(
          `<h7><font size="3" color="#383838">${datainfo.infoguilds}</font> Guilds cached!</h7>`
      );
  } catch {
      (err)
      console.log(err);
  }
});