// import _ from 'loadsh';
import dotenv from 'dotenv'

//* load env variables
dotenv.config()
const env = process.env.NODE_ENV || 'development'
const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 5000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '7d',
  },
  accessTokenSecret: {
    jwt: process.env.ACCESS_TOKEN_SECRET,
    jwtExp: '15m',
  },
  refreshTokenSecret: {
    jwt: process.env.REFRESH_TOKEN_SECRET,
    jwtExp: '7d',
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
  origin: process.env.ORIGIN || 'http://localhost:3000,http://localhost:5000,http://localhost:3001',
}

// const envConfig = require(`./${env}`).default;

// export default _.merge(baseConfig, envConfig);

export default { ...baseConfig }
