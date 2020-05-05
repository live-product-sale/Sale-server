const captchapng = require('captchapng')
const { setItem } = require('../util/redis/index')
const { uniformRes } = require('../util/utils')
const { resCode } = require('../util/errorCode')
const sendPhone = require('../util/tool/phone')

class Common {
  // 处理生成动态验证码
  static captcha(ctx) {
    const code = parseInt(Math.random() * 9000 + 1000)
    setItem('captcha', code)
    const pic = new captchapng(80, 30, code)
    pic.color(229, 229, 229)                              //背景颜色
    pic.color(255, 255, 255);                      //文字颜色
    const img = pic.getBase64()
    const imgbase64 = new Buffer.from(img, 'base64')
    ctx.set('Content-Type', 'image/png')
    return ctx.body = uniformRes(resCode.SUCCESS, imgbase64)
  }
  // 获取短信验证码
  static async getMsgCode(ctx) {
    const { cphone } = ctx.request.query
    console.log(cphone)
    const code = parseInt(Math.random() * 9000 + 1000)
    setItem('mobileCode', code)
    const result = await sendPhone(code, cphone)
    if (JSON.parse(result).return_code == "00000") {
      return ctx.body = uniformRes(resCode.SUCCESS, null)
    } else {
      return ctx.body = uniformRes(resCode.ERROR, JSON.parse(result).return_code)
    }
  }
}
module.exports = Common