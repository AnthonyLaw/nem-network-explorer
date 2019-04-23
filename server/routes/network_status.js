var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  let page_data ={
    page_title: conf.app_title + ' - Network Status',
  }
  res.render('network-graphs',page_data)
});

module.exports = router;
