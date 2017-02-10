var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { title: 'setup page will live here' });
});

module.exports = router;

