const { getItem, redisClient } = require('../util/redis/index')

// 检查手机验证码
const checkMobCode = async (ctx, next) => {
  const { mobileCode } = ctx.request.body
  if(!mobileCode) {
    return ctx.body = {
      code: '000001',
      data: null,
      msg: '验证码为空'
    }
  } 
  const mobCode = await getItem('mobileCode')
  if(mobCode === mobileCode) {
    await next()
    redisClient.del('mobileCode')
  } else {
    return ctx.body = {
      code: '000002',
      data: null,
      msg: '验证码不正确'
    }
  }
} 

module.exports = checkMobCode