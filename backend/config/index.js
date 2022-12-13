const devConfig = require('./dev.config');
const prodConfig = require('./prod.config');
const _ = require('lodash');



const env = process.env.NODE_ENV || 'development';

// default configurations

const defaultConfig = {
    PORT: 5000,
}


// merge default configurations with environment specific configurations
let config = {};


if (env === 'development') {
    config = devConfig;
}else{
    config = prodConfig;
}


module.exports = _.merge(defaultConfig, config);