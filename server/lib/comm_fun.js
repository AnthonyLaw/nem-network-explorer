var request = require("request");
var fnc={};
fnc.request_res = function (url){
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return body // Print the json response
        }
        console.log(error);
        return body 
    })
    return false;
}
module.exports = fnc;