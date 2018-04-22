const client = require('../utils/redisConnect');

function auth (token) {
  return new Promise((resolve, reject) => {
    client.get(token, (err, res) => {
      if (err) {
        reject(err)
      }

      if(!res) {
        return resolve(false)
      } else {
        client.del(token)
        return resolve(true)
      }
    });
  });
}

async function tokenAuth(req, res, next) {
  console.log(`Authentication Token : ${req.query.token}`)
  const check = await auth(req.query.token)
  if(!check)
    res.render('tokenError',{ title: '認証エラー',
                              message: '有効なTokenではありません'})

  next()
}

module.exports = tokenAuth
