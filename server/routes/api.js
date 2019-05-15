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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(send_data);
  });
});
router.get('/node_list', async function (req, res, next) {
  var allrequests = [getData(__dirname + "/../data/nodelist.json"), getData(__dirname + "/../data/mother_node_info.json")]
  Promise.all(allrequests).then((data) => {
    console.log(data);
    var page_infodata = {
      'node_list': data[0],
      'chain_info': data[1],
      'ip_nodes': conf.api_address,
    };
    page_infodata.chain_info.last_block_info.block.timestamp = new nem2.UInt64(page_infodata.chain_info.last_block_info.block.timestamp).compact()+conf.networktime;
    //console.log( page_infodata.chain_info.last_block_info.block.timestamp );

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(page_infodata);
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
