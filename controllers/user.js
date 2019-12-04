const crypto = require('crypto')
const jwt = require('jsonwebtoken')  // 用户初次登陆生成token
const userModel = require('../db/userModel/index')

class UserController {
  //用户注册
  static async register(ctx) {

  }
  //用户登陆
  static async login(ctx) {
    const data = ctx.request.body
    console.log('接收数据', data)
    if( !data.phone || !data.password) {
      return ctx.body = {
          code: '000002',
          data: null,
          message: '参数不合法'
        }
    }
    const result = await userModel.findOne({
      user_name: data.phone,
      user_password: data.password // 密码加密存储
    })
    if(result !== null) {
      const token = jwt.sign({
        name: result.name,
        _id: result._id
      }, 'my_token', { expiresIn: '2h'});
      return ctx.body = {
        code: '000001',
        data: token,
        message: '登陆成功'
      }
    } else {
      return ctx.body = {
        code: '000002',
        data: null,
        message: '用户名或密码错误'
      }
    }
  }
  //用户退出
  static async loginOut(ctx) {

  }
  //获取用户信息
  static async userInfo(ctx) {

  }
}
module.exports = UserController