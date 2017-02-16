const express = require('express');
const router = express.Router();

/* users screen */
router.get('/', function(req, res, next) {
  res.send('users screen will be here');
});

module.exports = router;
