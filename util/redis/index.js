const redis = require('redis')
const port = '6379'
const host = '127.0.0.1'
const redisClient = redis.createClient(port, host)

/**
 * 存储健值 健名
 * @param {String} key 
 * @param {String} value 
 * @param {String} expires 
 */
function setItem(key, value, expires) {
  redisClient.set(key, value)
  if(expires) {
    redisClient.expire(key, expires)
  }
}
/**
 * 获取健值
 * @param {String} key 
 */
function getItem(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err)
      }
      resolve(val)
    })
  })
}
module.exports = {
  redisClient,
  setItem,
  getItem
}