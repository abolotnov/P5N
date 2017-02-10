var express = require('express');
var router = express.Router();

/* users screen */
router.get('/', function(req, res, next) {
  res.send('users screen will be here');
});

module.exports = router;
