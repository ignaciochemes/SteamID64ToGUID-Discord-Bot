const { createHash } = require('crypto');

const guidController = (req, res) => {
    let bytes = [];
	
    if (!req.query.steam) {
        return res.json({
            api: "/api/guid?steam=your-steam-id-64-here",
            message: "Enter the query parameters",
            typeof: "Error"
        })
    }
    
    let argumentos = req.query.steam;
    if (argumentos.length != 17) {
        return res.json({
            message: "Argument must be 17 characters",
            typeof: "Error"
        });
    } 
    
    try {
        for (let i = 0; i < 8; i++) {
            bytes.push(Number((BigInt(argumentos) >> (8n * BigInt(i))) & 0xFFn))
        }
        let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
        bytes = [];

        let respuesta = {
            steamId64: argumentos,
            guid: guid
        };
        res.json(respuesta);

    } catch(e) {
        res.json({
            Error: "Fatal Error"
        });
    }
}

const uidController = (req, res) => {
    if (!req.query.steam) {
        return res.json({
            api: "/api/uid?steam=your-steam-id-64-here",
            message: "Enter the query parameters",
            typeof: "Error"
        })
    }
    
    let argumentos = req.query.steam;
    
    try {
        const mas = /\+/g;
        const guion = '-';
        const barra = /\//g;
        const guionBajo = '_';
        let hash = createHash('sha256').update(argumentos).digest('base64');
        let tomaHash = hash.replace(mas, guion);
        let reemplazaHash = tomaHash.replace(barra, guionBajo);

        let respuesta = {
            steamId64: argumentos,
            uidCfTools: reemplazaHash,
            uidBohemia: hash
        };
        res.json(respuesta);
    } catch(e) {
        console.log(e);
        res.json({
            Error: "Fatal Error"
        });
    }
}

module.exports = {
    guidController,
    uidController
}