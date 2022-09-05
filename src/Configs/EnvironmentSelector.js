const dotenv = require('dotenv');
const path = require('path');
const { EnvironmentConstants } = require('../Constants/EnvironmentConstants');

const PROD = EnvironmentConstants.PROD;
const DEV = EnvironmentConstants.DEV;
const LOCAL = EnvironmentConstants.LOCAL;

let envData = {};

const getEnvironment = () => {
    switch (process.env.STEAMID_ENV) {
        case PROD:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;
            console.log('Environment: Production');
            break;
        case DEV:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env.dev') }).parsed;
            console.log('Environment: Development');
            console.log(process.env.CLIENT_ID)
            break
        case LOCAL:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env.local') }).parsed;
            console.log('Environment: Local');
            break
        default:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;
    }
}

module.exports = { getEnvironment, envData }