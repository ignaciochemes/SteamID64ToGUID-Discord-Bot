const { connect } = require('mongoose');

class DatabaseConnection {
    static _instancia;
    constructor() {
        this.dbConnection();
    }

    static getInstance() {
        if (DatabaseConnection._instancia) throw new Error('Ya existe una instancia de DatabaseConnection');
        DatabaseConnection._instancia = new DatabaseConnection();
        return DatabaseConnection._instancia;
    }

    async dbConnection() {
        await connect(`${process.env.DB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => { console.log('Base de datos conectada!') })
            .catch((e) => { console.log('Error al conectar con la base de datos!', e) })
    };
}

module.exports = { DatabaseConnection };