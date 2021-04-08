'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.108.58.142:8201"'
  // BASE_API: '"http://127.0.0.1:8201"'
  // http://192.168.230.61:8201
  // http://47.108.58.142:8201
  // http://192.168.240.6:8201
  // http://192.168.220.19:8201
})
