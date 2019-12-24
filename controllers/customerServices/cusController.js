const { createUID, createToken } = require('../../util/utils')
const cusModal = require('../../modal/cus_modal')

class cusController {
  // 处理登陆
  static async login(ctx) {
    const { cname, cpassword } = ctx.request.body
    if( !cname || !cpassword) {
      return ctx.body = {
        code: '000002',
        data: null,
        msg: '账号密码不能为空'
      }
    }
    const result = await cusModal.findOne({
      where: {
        cname: cname,
        cpassword: cpassword
      }
    })
    if(result !== null) {
      return ctx.body = {
        code: '000000',
        data: { 
          uid: result.uuid,
          token: createToken({cname, cpassword})
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
    const { cname, cpassword } = ctx.request.body
    const uuid = createUID()
    const result = await cusModal.create({
      uuid: uuid,
      cname: cname,
      cpassword: cpassword
    })
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
  // 用户是否重复
  static async check(ctx) {
    const { cname } = ctx.request.body 
    if (!cname) {
      return ctx.body = {
        code: '000002',
        data: null,
        msg: '用户名为空'
      }
    } 
    const result = cusModal.findOne({
      where: {
        cname: cname
      }
    })
    if (!result) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '用户名可以注册'
      }
    } else {
      return ctx.body = {
        code: '0000001',
        data: null,
        msg: '用户名已注册'
      }
    }
  }
}

module.exports = cusController