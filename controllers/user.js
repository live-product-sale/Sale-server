// const crypto = require('crypto')
const { createToken } = require('../util/utils')
const userModel = require('../db/userModel/index')

class UserController {
  //用户注册
  static async register(ctx) {
     const data = ctx.request.body
     const user = {
       user_id: data.uid,
       user_phone: data.phone,
       user_password: data.password
     }
     const result = await userModel.create(user)
     console.log(result)
     ctx.body = {
       code: '000001',
       message: '注册成功'
     }
  }
  //用户登陆
  static async login(ctx) {
    const data = ctx.request.body
    if( !data.name || !data.password) {
      return ctx.body = {
          code: '000002',
          data: null,
          message: '参数不合法'
        }
    }
    const result = await userModel.findOne({
      where: {
        user_name: data.name,
        user_password: data.password
      }
    })
    if(result !== null) {
      const token = createToken(data)
      return ctx.body = {
        code: '000001',
        data: { "token": token },
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