var express = require('express');
var router = express.Router();
const satelize = require('satelize');
const request = require('request');
const fs = require('fs');
const nem2 = require('nem2-sdk');
/* GET home page. */

router.get('/chain_info', async function (req, res, next) {
  var allrequests = [getData(__dirname + "/../data/mother_node_info.json"),] //getData(__dirname + "/../data/mother_node_info.json")
  Promise.all(allrequests).then((data) => {
    // console.log(data[0]);
    
    var send_data = {
      'height': data[0].chain_height,
      'block_timestamp': new nem2.UInt64(data[0].last_block_info.block.timestamp).compact() + conf.networktime,
      'block_time': data[0].last_block_info.block.timestamp
    }
    var s = new nem2.UInt64(data[0].last_block_info.block.timestamp).compact();
    res.send(send_data);
  });
});



function getData(filename) {
  //__dirname + "/../data/nodelist.json"
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', function (err, contents) {
      return resolve(JSON.parse(contents))
    })
  });
}
module.exports = router;
