const { getItem, redisClient } = require('../util/redis/index')
const { ResFormat } = require('../util/utils')
const { resCode, errMsg } = require('../util/errorCode')

//登陆验证处理
const checkLogin = async (ctx, next) => {
  const { code, cphone, cpassword } = ctx.request.body
  if (!code || !cphone || !cpassword) {
    return ctx.body = ResFormat(resCode.LACK, null, errMsg[resCode.LACK])
  }
  const data = await getItem('captcha')
  // console.log('data', data, 'code', code)
  if (code === data) {
    await next()
    redisClient.del('captcha')
  } else {
    redisClient.del('captcha')
    return ctx.body = ResFormat(resCode.LACK, null, errMsg[resCode.LACK])
  }
}
module.exports = checkLogin