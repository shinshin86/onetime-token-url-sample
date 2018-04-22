const crypto = require('crypto');
const client = require('../utils/redisConnect')

function generateToken({ stringBase = 'base64', byteLength = 48 } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase).replace('+', ''));
      }
    });
  });
}

function checkToken(token) {
  return new Promise((resolve, reject) => {
    client.get(token, (err, res) => {
      if (err) {
        reject(err)
      }

      if(!res) {
        return resolve(false)
      } else {
        console.log('Already exists one time token!!')
        return resolve(true)
      }
    });
  })
}

async function handler(req, res, next) {
  do {
    res.onetime = await generateToken();
    console.log(`token : ${res.onetime}`)
  } while (await checkToken(res.onetime))

  client.set(res.onetime, 'onetime-secret')
  next()
}

module.exports = handler
