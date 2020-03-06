const { 
  createToken, 
  generateId 
} = require('../../util/utils')
const userInfo = require('../../modal/user/userinfo')
const userModal = require('../../modal/user')

class cusController {
  // 处理登陆
  static async login(ctx) {
    const { cphone, cpassword } = ctx.request.body
    const result = await userModal.findOne({
      where: { cphone, cpassword }
    })
    if(result !== null) {
      return ctx.body = {
        code: '000000',
        data: { 
          token: createToken({cphone, cpassword}),
          userinfo: {
            ...result.dataValues, 
            cpassword: undefined,
            createdAt: undefined, 
            updatedAt: undefined
          }
        },
        msg: '登陆成功'
      }
    } else {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '账号或密码错误'
      }
    } 
  }
  // 处理注册
  static async register(ctx) {
    const { cpassword, cphone } = ctx.request.body
    const uid = generateId()
    const result = await userModal.create(
      { uid, cphone, cpassword })
    if(result) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '注册成功'
      }
    } else {
       return ctx.body = {
         code: '000001',
         data: null,
         msg: '注册失败'
       }
    }
  }
  // 退出登录
  static logout(ctx) {

  }
  // 修改密码
  static async modifyPass(ctx) {
    const { cphone, cpassword } = ctx.request.body
    if(!cphone) {
      return ctx.body = {
        code: '000002',
        data: null,
        msg: '手机号为空'
      }
    }
    const result = await userModal.findOne({
      where: {
        cphone
      }
    })
    if(!result) {
       return ctx.body = {
         code: '000003',
         data: null,
         msg: '该账号不存在'
       }
    }
    const res = await userModal.update(
      { cpassword },
      { 
        where: { cphone }
      })
    if(res) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '修改成功'
      }
    }
  }
}

module.exports = cusController