const { createHash } = require('crypto');

class ApiService {
    constructor(){}
    static guidService(argumentos) {
        let bytes = [];
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
            return respuesta;
        } catch(e) {
            return { "Error": "Fatal Error" }
        }
    }

    static uidService(argumentos) {
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
            return respuesta;
        } catch(e) {
            return { "Error": "Fatal Error" };
        }
    }
}

module.exports = { ApiService }