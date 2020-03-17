const captchapng = require('captchapng')
const { setItem } =  require('../util/redis/index')
const sendPhone = require('../util/tool/phone')

class Common {
  // 处理生成动态验证码
  static captcha (ctx) {
    const code = parseInt(Math.random()*9000 + 1000)
    setItem('captcha', code)
    const pic = new captchapng(80, 30, code)
    pic.color(1,1,1,90)                              //背景颜色
    pic.color(80, 80, 80, 255);                      //文字颜色
    const img = pic.getBase64()
    const imgbase64 = new Buffer.from(img, 'base64')
    ctx.set('Content-Type', 'image/png')
    return ctx.body = imgbase64
  }
  // 获取短信验证码
  static async getMsgCode(ctx) {
    const { cphone } = ctx.request.query
    const code = parseInt(Math.random()*9000 + 1000)
    setItem('mobileCode', code)
    const result = await sendPhone(code, cphone)
    if(JSON.parse(result).return_code == "00000") {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '发送成功'
      }
    } else {
      return ctx.body = {
        code: '000005',
        data: JSON.parse(result).return_code,
        msg: '发送失败'
      }
    }
  }
  
}
module.exports = Common