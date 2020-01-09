var CryptoJS = require("crypto-js");
var request = require('request');
var querystring = require('querystring');

// 云市场分配的密钥Id
var secretId = "AKIDkyk30mopRex7CB84mwA8EZN9evT5T030A3Xa";
// 云市场分配的密钥Key
var secretKey = "DlaSQcDhfj6g1D7Fs5tq39NFut0Dlla8eE72iU6o";
var source = "market-douxsvi7y";

/**
 * 发送验证码
 * @param {String} code 
 * @param {String} phone 
 * @returns body
 */
const sendPhone = (code, mobile) => {
  var datetime = (new Date()).toGMTString();
  var signStr = "x-date: " + datetime + "\n" + "x-source: " + source;
  var sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(signStr, secretKey))
  var auth = 'hmac id="' + secretId + '", algorithm="hmac-sha1", headers="x-date x-source", signature="' + sign + '"';

  // 请求方法
  var method = 'GET';
  // 请求头
  var headers = {
      "X-Source": source,
      "X-Date": datetime,
      "Authorization": auth,
  }
  // 查询参数
  var queryParams = {
    'mobile': mobile,
    'param': `code:${code}`,
    'tpl_id': 'TP1801042'}
    // url参数拼接
  var url = 'http://service-4xrmju6b-1255399658.ap-beijing.apigateway.myqcloud.com/release/dxsms';
  if (Object.keys(queryParams).length > 0) {
      url += '?' + querystring.stringify(queryParams);
  }
  var options = {
    url: url,
    timeout: 5000,
    method: method,
    headers: headers
  }
  if (['POST', 'PUT', 'PATCH'].indexOf(method) != -1) {
    options['body'] = querystring.stringify(bodyParams);
    options['headers']['Content-Type'] = "application/x-www-form-urlencoded";
  }
  return new Promise((resolve, reject) => {
   request(options, (error, response, body) => {
     if(error) {
       console.log(error)
       reject(error)
     }
     resolve(body)
   })
  })
// body参数（POST方法下）
}
// sendPhone('1234', '17602958129')
module.exports = sendPhone