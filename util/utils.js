const md5 = require('js-md5')
const { Base64 } = require('js-base64')
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')  // 生成token
const secret = '19970926ly'   // 生成token的密钥

/**
 *  获取推流地址
 *  如果不传递 key 和 过期时间， 将返回不含防盗链的 url
 *  @param streamName 用来区别不同推流地址的唯一流名称
 *  @return String url 推流地址
 */
 const getPushUrl = ( streamName )=> {
   const stream = Base64.encode(streamName)
   const time = new Date(new Date().setDate(new Date().getDate() + 1)).getTime() / 1000
   const pushDomain = '67845.livepush.myqcloud.com'   // 推流域名

   const pushKey = '5850747f8aab996c8214d21336f58179'  // API key
   const txTime = parseInt(time).toString(16).toUpperCase()
   const txSecret = md5(`${ pushKey }.${ stream }.${ txTime }`)
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return `rtmp://${ pushDomain }/live/${stream}${ext_str}`
 }
 /**
  * 获取拉流地址
  * @param streamName {string}
  * @return url { string }
  */
 const getPlayUrl = (streamName) => {
   const playDomain = 'zhangly.xyz'
   const time = new Date(new Date().setDate(new Date().getDate() + 1)).getTime() / 1000
   const stream = Base64.encode(streamName)

   const playKey = '5850747f8aab996c8214d21336f58179'
   const txTime = parseInt(time).toString(16).toUpperCase()
   const txSecret = md5(`${ playKey }.${ stream }.${ txTime }`)
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return  `rtmp://${ playDomain }/live/${ stream }${ ext_str }`
 }
//  测试
//  console.log(getPlayUrl('test'))
//  console.log(getPushUrl('test'))
/**
 * 用于生成token
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
 * @returns { UUID } uid
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