const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { title: 'setup page will live here' });
});

module.exports = router;

