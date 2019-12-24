const emailer = require('nodemailer')

// 创建 smpt 客户端配置
const config = {
  host: 'smtp.163.com',
  port: 465,
  auth: {
    user: '17602958129@163.com',  //邮箱的账号
    pass: '19970926ly' // 邮箱的授权密码
  }
}
// 创建一个 smpt 邮箱客户端
const transporter = emailer.createTransport(config)
/**
 * 发送邮件
 * @param {string} userEmail
 * @param {number} code
 */
const sendMail = (userEmail, code) => {
  let email = {
    title: '验证码',
    htmlBody: `您的验证码为${code}，请于1分钟内正确输入，如非本人操作，请忽略此短信。`
  }
  let main = {
    from: '17602958129@163.com',
    to: userEmail,
    subject: email.title,
    html: email.htmlBody
  }
  transporter.sendMail(main, function(err, info) {
    if(err) {
      return console.log(err)
    }
    console.log('mail sent: ', info.response)
  })
}
// 测试
 
sendMail('2315662855@qq.com', '13245')
module.exports = sendMail