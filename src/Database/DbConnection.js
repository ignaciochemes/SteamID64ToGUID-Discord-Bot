import { Sequelize } from 'sequelize';

class DatabaseConnection {
    static _instance;
    constructor() {
        this.dbConnection();
    }

    static getInstance() {
        if (DatabaseConnection._instance) throw new Error('Ya existe una instancia de DatabaseConnection');
        DatabaseConnection._instance = new DatabaseConnection();
        return DatabaseConnection._instance;
    }

    async dbConnection() {
        const sequelize = new Sequelize(process.env.DATABASE_URL);
        await sequelize.authenticate();
        console.log('Base de datos conectada!');
    };
}

export default DatabaseConnection;