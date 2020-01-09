const { getItem, redisClient } = require('../util/redis/index')

//登陆验证处理
const checkLogin = async (ctx, next) => {
  const { code , cname, cpassword } = ctx.request.body
  if(!code) {
    return ctx.body = {
      code: '000005',
      data: null,
      msg: '验证码为空'
    }
  }
  if( !cname || !cpassword) {
    return ctx.body = {
      code: '000002',
      data: null,
      msg: '账号密码不能为空'
    }
  }
  const data = await getItem('captcha')
  console.log('data', data, 'code', code)
  if(code === data) {
    await next()
    redisClient.del('captcha')
  } else {
    return ctx.body = {
      code: '000005',
      data: null,
      msg: '验证码不正确'
    }
  }
}
module.exports = checkLogin