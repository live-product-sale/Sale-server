const md5 = require('js-md5')
const { Base64 } = require('js-base64')
const jwt = require('jsonwebtoken')  // 生成token
const secret = '19970926ly'          // 生成token的密钥

/**
 *  获取推流地址
 *  如果不传递 key 和 过期时间， 将返回不含防盗链的 url
 *  @param streamName 用来区别不同推流地址的唯一流名称
 *  @return String url 推流地址
 */
 const getPushUrl = ( live_id )=> {
   const stream = live_id
   const time = parseInt((Date.now() + 12 * 60 *60 * 1000) / 1000)
   const domain = '67845.livepush.myqcloud.com'   // 推流域名
   const Key = '5850747f8aab996c8214d21336f58179'  // API key
   const txTime = time.toString(16).toUpperCase()
   const txSecret = md5(Key + stream + txTime )
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return `rtmp://${ domain }/live/${ stream }${ ext_str }`
 }
 /**
  * 获取拉流地址
  * @param streamName {string}
  * @return url { string }
  */
 const getPlayUrl = (live_id) => {
   const domain = 'zhangly.xyz'
   const time = parseInt((Date.now() + 12 * 60 * 60 * 1000) / 1000)
   const stream = live_id
   const Key = '5850747f8aab996c8214d21336f58179'
   const txTime = time.toString(16).toUpperCase()
   const txSecret = md5(Key + stream + txTime )
   const ext_str = `?txSecret=${ txSecret }&txTime=${ txTime }`
   return  `rtmp://${ domain }/live/${ stream }${ ext_str }`
 }
/**
 * 用于生成token
 * @param { any } data 
 * @param { String } secret 
 * @returns { String } token
 */
const createToken = (data) => {
  const token = jwt.sign(data, secret, {expiresIn:'24h'} )
  return token
}
/**
 * 随机生成ID
 */
const generateId = () => {
  return Math.random().toString().substr(3, 8) + Date.now().toString(36)
}

module.exports = {
  getPushUrl,
  getPlayUrl,
  createToken,
  generateId
}