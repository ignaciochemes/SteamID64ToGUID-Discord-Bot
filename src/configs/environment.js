const dotenv = require('dotenv');
const path = require('path');
const { EnvironmentConstants } = require('../constants/environmentConstants');

const PROD = EnvironmentConstants.PROD;
const DEV = EnvironmentConstants.DEV;
const LOCAL = EnvironmentConstants.LOCAL;

let envData = {};

const getEnvironment = () => {
    switch (process.env.STEAMID_ENV) {
        case PROD:
            envData = dotenv.config({path: path.resolve(__dirname, '../../.env') });
            break;
        case DEV:
            envData = dotenv.config({path: path.resolve(__dirname, '../../.env.dev') });
            break
        case LOCAL:
            envData = dotenv.config({path: path.resolve(__dirname, '../../.env.local') });
            break
        default:
            envData = dotenv.config().parsed;
    }
}

module.exports = { getEnvironment, envData }