import jwt from 'jsonwebtoken'
import config from '../config'

const TokenUtils = Object.create({
  // * Access token
  accessToken: async (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...payload }, config.secrets.jwt, { expiresIn: config.accessTokenSecret.jwtExp }, (error, token) => {
        if (error) return resolve(false)
        resolve(token)
      })
    })
  },

  // * Verify Access token
  verifyAccessToken: async (token) => {
    return new Promise((resolve) => {
      jwt.verify(token, config.secrets.jwt, (error, decoded) => {
        if (error) return resolve(false)
        resolve(decoded)
      })
    })
  },


  // * Refresh token
  refreshToken: async (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...payload }, config.secrets.jwt, { expiresIn: config.refreshTokenSecret.jwtExp }, (error, token) => {
        if (error) return resolve(false)
        resolve(token)
      })
    })
  },

  // * Verify Refresh token
  verifyRefreshToken: async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.jwt, (error, decoded) => {
        if (error) return resolve(false)
        resolve(decoded)
      })
    })
  }
})



export default TokenUtils
