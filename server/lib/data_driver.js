const request = require("request");
const fs = require('fs');
path = require('path');
var ip2loc = require("ip2location-nodejs");
const http = require('http');
const axios = require('axios');
const satelize = require('satelize');
let fnc = {};
var file_busy = 0;

fnc.sync_all_chain = function () {
    create_base_info();
    setInterval(function () {
        be_in_sync();
    }, 30000);
    setInterval(function () {
        mother_node_update();
    }, 10000);
    
}
function create_base_info() {
    get_ip_info(conf.api_address).then(function (base_data) {
        fs.writeFile(__dirname + "/../data/nodelist.json", JSON.stringify(base_data), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("base json saved");
        });
    });
}
function be_in_sync() {
    fs.readFile(__dirname + "/../data/nodelist.json", 'utf8', function (err, contents) {
        var fdata = JSON.parse(contents);
        conf.api_address.forEach((item, idx) => {
            axios.all([
               // axios.get('http://' + item + ':3000' + '/node/info'),
                axios.get('http://' + item + ':3000' + '/chain/height'),
                // axios.get('http://' + item + ':3000' + '/node/time'),

            ]).then(axios.spread(( res2) => {
              //  fdata[item]['nodeinfo'] = res1.data;
                fdata[item]['chain_height'] = res2.data.height[0];
                fdata[item]['status'] = 1;
                //   fdata[item]['timesync'] = res3;
                if (fdata[item]['chain_height'] && fdata[item]['chain_height']) {
                    var start = Date.now();
                    axios.all([
                        axios.get('http://' + item + ':3000' + '/block/' + fdata[item]['chain_height'])
                    ]).then(axios.spread((response1) => {
                        //console.log(response1.data);
                        fdata[item]['last_block'] = response1.data;
                        fdata[item]['resp_time'] = Date.now() - start
                        if (idx == (conf.api_address.length - 1)) {
                            fs.writeFile(__dirname + "/../data/nodelist.json", JSON.stringify(fdata), function (err) {
                                if (err) { return console.log(err); } console.log("The file was saved main");
                            });
                        }
                    })).catch(error => {
                        fdata[item]['last_block'] = null;
                        if (idx == (conf.api_address.length - 1)) {
                            fs.writeFile(__dirname + "/../data/nodelist.json", JSON.stringify(fdata), function (err) {
                                if (err) { return console.log(err); } console.log("The file was saved! er1");
                            });
                        }
                    });
                }
            })).catch(error => {
                fdata[item]['nodeinfo'] = null;
                fdata[item]['chain_height'] = null;
                fdata[item]['status'] = 0;
                if (idx == (conf.api_address.length - 1)) {
                    fs.writeFile(__dirname + "/../data/nodelist.json", JSON.stringify(fdata), function (err) {
                        if (err) { return console.log(err); } console.log("The file was saved! er2");
                    });
                }
            });
        });
    });
}
function get_ip_info(iplist) {
    ip2loc.IP2Location_init(__dirname + "/../data/IP2LOCATION-LITE-DB11.BIN");
    var alldata = {};
    var allrequests = [];
    return new Promise((resolve, reject) => {
        iplist.forEach((item, idx) => {
            var temp = ip2loc.IP2Location_get_all(item);
            alldata[item] = {};
            alldata[item]['country'] = temp.country_long;
            alldata[item]['country_short'] = temp.country_short;
            alldata[item]['ip_no'] = temp.ip_no;
            alldata[item]['region'] = temp.region;
            alldata[item]['city'] = temp.city;
            alldata[item]['latitude'] = temp.latitude;
            alldata[item]['longitude'] = temp.longitude;
            //  alldata[item]['status'] = temp.status;
            alldata[item]['zipcode'] = temp.zipcode;
            axios.all([
                axios.get('https://api.ipdata.co/' + item + '?api-key=83b546aedbffc7f4519efd18bd08d40b079a606192eb71b8a9e776d8'),
                axios.get('http://' + item + ':3000' + '/node/info'),
            ]).then(axios.spread((res1,res2) => {
                    alldata[item]['nodeinfo'] = res2.data;
                    alldata[item]['status'] = 1;
                    alldata[item]['isp'] = res1.data.organisation;
                    alldata[item]['flag'] = res1.data.flag;
                    alldata[item]['timezone'] = res1.data.time_zone;
                    //console.log( res1.data);
                    if (idx == (iplist.length - 1)) {
                        
                        return resolve(alldata);
                    }
                }))
                .catch(error => {
                    alldata[item]['nodeinfo'] = null;
                    alldata[item]['status'] = 0;
                    console.log('error');
                });
        });
    })
}
function mother_node_update() {
    conf.nis_base_url;
    console.log(conf.nis_base_url);
    var base_data = {};

    axios.all([
        axios.get(conf.nis_base_url + 'node/info'),
        axios.get(conf.nis_base_url + '/chain/height')
    ]).then(axios.spread((res1, res2) => {
        base_data['node_info'] = res1.data;
        base_data['chain_height'] = res2.data.height[0];
        if (base_data['chain_height']) {
            axios.get(conf.nis_base_url + 'block/' + res2.data.height[0])
                .then(response => {
                    base_data['last_block_info'] = response.data;
                    fs.writeFile(__dirname + "/../data/mother_node_info.json", JSON.stringify(base_data), function (err) {
                        if (err) { return console.log(err); } console.log("mother_node_info created");
                    });
                }).catch(error => {
                    console.log('er');
                });
        }
    })).catch(error => {
        console.log('er');
    });
}
module.exports = fnc;