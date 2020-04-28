const { getItem, redisClient } = require('../util/redis/index')
const { uniformRes } = require('../util/utils')
const { resCode, errMsg } = require('../util/errorCode')

// 检查手机验证码
const checkMobCode = async (ctx, next) => {
  const { mobileCode } = ctx.request.body
  if(!mobileCode) {
    return ctx.body = uniformRes(resCode.LACK, null, errMsg[resCode.LACK])
  } 
  const mobCode = await getItem('mobileCode')
  if(mobCode === mobileCode) {
    await next()
    redisClient.del('mobileCode')
  } else {
    return ctx.body = uniformRes(resCode.PARAMETER_ERR, null, errMsg[resCode.PARAMETER_ERR])
  }
} 

module.exports = checkMobCode