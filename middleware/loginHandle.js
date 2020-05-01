const { getItem, redisClient } = require('../util/redis/index')
const { uniformRes } = require('../util/utils')
const { resCode } = require('../util/errorCode')

//登陆验证处理
const checkLogin = async (ctx, next) => {
  const { code, cphone, cpassword } = ctx.request.body
  if (!code || !cphone || !cpassword) {
    return ctx.body = uniformRes(resCode.LACK, null)
  }
  const data = await getItem('captcha')
  // console.log('data', data, 'code', code)
  if (code && code === data) {
    await next()
    redisClient.del('captcha')
  } else {
    redisClient.del('captcha')
    return ctx.body = uniformRes(resCode.USER_CAPTCHA_ERR, null)
  }
}
module.exports = checkLogin