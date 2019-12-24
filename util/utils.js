const md5 = require('js-md5')
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')  // 生成token
const secret = '19970926ly'   // 生成token的密钥

/**
 *  获取推流地址
 *  如果不传递 key 和 过期时间， 将返回不含防盗链的 url
 *  @param streamName 用来区别不同推流地址的唯一流名称
 *  @param time 时间戳
 *  @return String url 推流地址
 */
 const getPushUrl = ( streamName, time = null) => {
   const pushDomain = '67845.livepush.myqcloud.com'   // 推流域名
   const pushKey = '5850747f8aab996c8214d21336f58179'  // API key
   const txTime = parseInt(time).toString(16).toUpperCase()
   const txSecret = md5(`${ pushKey }${ streamName }${ txTime }`)
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return `rtmp://${ pushDomain }/live/${streamName}${ext_str}`
 }
 /**
  * 获取拉流地址
  * @param streamName {string}
  * @param time {string}
  * @return url { string }
  */
 const getPlayUrl = (streamName, time = null) => {
   const playDomain = 'zhangly.xyz'
   const playKey = '5850747f8aab996c8214d21336f58179'
   const txTime = parseInt(time).toString(16).toUpperCase()
   const txSecret = md5(`${ playKey }${ streamName }${ txTime }`)
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return  `rtmp://${ playDomain }/live/${ streamName }${ ext_str }`
 }
//  测试
//  console.log(getPlayUrl('232456', new Date()))
/**
 *  用于生成token
 * @param { any } data 
 * @param { String } secret 
 * @returns { String } token
 */
const createToken = (data) => {
  const token = jwt.sign(data, secret, {expiresIn: '2h'})
  return token
}
/**
 * 生成uid
 * @return { UUID } uid
 */
const createUID = () => {
  const uid = uuid().split('-').join('')
  return uid
}
//  测试
// console.log(createUID())

module.exports = {
  getPushUrl,
  getPlayUrl,
  createToken,
  createUID
}