const redis = require('redis')
const conn = redis.createClient({port: 6379})
module.exports = conn
