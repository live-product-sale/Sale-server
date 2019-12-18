const md5 = require('js-md5')

const pushDomain = '67845.livepush.myqcloud.com'   // 推流域名
const pushKey = '5850747f8aab996c8214d21336f58179'  // API key
/**
 *  获取推流地址
 *  如果不传递 key 和 过期时间， 将返回不含防盗链的 url
 *  @param domain 域名
 *  @param streamName 用来区别不同推流地址的唯一流名称
 *  @param key 安全密钥
 *  @param time 过期时间
 *  @return String url 推流地址
 */
 const getPushUrl = (domain, streamName, key = null, time = null) => {
   const txTime = parseInt(new Date(time).getTime() / 1000).toString(16).toUpperCase()
   const txSecret = md5(`${ key }${ streamName }${ txTime }`)
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return `rtmp://${domain}/live/${streamName}${ext_str}`
 }
//  测试
 console.log(getPushUrl(pushDomain, '232456', pushKey, new Date()))

module.exports = {
  getPushUrl
}