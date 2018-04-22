var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: "認証成功",
                       token: req.query.token });
});

module.exports = router;
