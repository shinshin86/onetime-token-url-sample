const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('token', { title: 'Token生成完了',
                        token: res.onetime});
});

module.exports = router;
