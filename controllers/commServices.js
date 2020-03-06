const captchapng = require('captchapng')
const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')

const { setItem } =  require('../util/redis/index')
const sendPhone = require('../util/tool/phone')

const cos = new COS({
  AppId:'1300616667',
  SecretId:'AKIDg0A5oIyrdB2fCXpQLp5SaTFnSr7BDdz5',
  SecretKey:'0LdlfKSLRKzQcdR5SZUAdrcBWdiz1pSs'
})
const BucketConfig = {
  Bucket: 'prod-live-1300616667',
  Region: 'ap-shanghai'
}

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
  /**
   * 处理文件上传方法
   * @requestParam { Number } account 账号
   * @requestParam { String } typeName 分类名称
   */
  static async uploadFile (ctx, next) {
    //  获取body中的传递的参数
    const { account , typeName } = ctx.request.body

    // 通过ctx.request.files.file方法获取上传的文件对象
    // 获取文件名称和文件所在路径
    // console.log(ctx.request.files.file)
    let { name:fileName, path } = ctx.request.files.file
    // 创建文件输入流
    const fileReader = fs.createReadStream(path)

    // 文件将要存放的文件夹路径
    const fileDir = `${__dirname}/upload-static/images/${account}/${typeName}`

    // 判断目录是否存在，不存在则创建
    if(!fs.existsSync(fileDir)) {
       try {
          fs.mkdirSync(fileDir, { recursive: true })
       } catch(e) {
         console.log(e)
       }
    }

    // 保存文件的最终路径 (文件路径 + 文件名)
    const filePath = `${fileDir}/${fileName}`

    // 创建文件输出流
    const fileWriter = fs.createWriteStream(filePath)

    // 写入文件数据
    fileReader.pipe(fileWriter)
    // 文件上传完成
    // 文件上传腾讯云对象存储
    ctx.request.body = {
      fileName,
      filePath
    }
    next()
  }
  
}
module.exports = Common