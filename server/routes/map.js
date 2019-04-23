var express = require('express');
var router = express.Router();
const fs = require('fs');
/* GET users listing. */
router.get('/', function (req, res, next) {
  //res.send('respond with a resource');
  var allrequests = [getData(__dirname + "/../data/nodelist.json")]
  Promise.all(allrequests).then((data) => {
    let page_data = {
      page_title: conf.app_title + ' - Network Status',
      page_data: {
        'node_list': data[0],
      }
    }
    console.log(data[0]);
    res.render('network-map', page_data);
  });
});

function getData(filename) {
  //__dirname + "/../data/nodelist.json"
     return new Promise((resolve, reject) => {
      fs.readFile(filename , 'utf8', function (err, contents) {
        return resolve(JSON.parse(contents))
      })
     });
}
module.exports = router;
