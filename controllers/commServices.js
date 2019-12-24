const captchapng = require('captchapng')

class Common {

  // 处理生成动态验证码
  static captcha (ctx) {
    const code = parseInt(Math.random()*9000 + 1000)
    const pic = new captchapng(80, 30, code)
    pic.color(1,1,1,90) //背景颜色
    pic.color(80, 80, 80, 255);  //文字颜色
    const img = pic.getBase64()
    const imgbase64 = new Buffer.from(img, 'base64')
    ctx.set('Content-Type', 'image/png')
    return ctx.body = imgbase64
  }
}
module.exports = Common