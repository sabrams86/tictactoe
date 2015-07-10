var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/computer', function(req, res, next) {
  res.render('computer', { title: 'Express' });
});

module.exports = router;
