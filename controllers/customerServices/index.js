const { createUID, createToken } = require('../../util/utils')
const cusModal = require('../../modal/cus_modal')

class cusController {
  // 处理登陆
  static async login(ctx) {
    const { cname, cpassword } = ctx.request.body
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
    const {cname, cpassword, cphone} = ctx.request.body
    const uuid = createUID()
    const result = await cusModal.create({
      cname,
      cphone,
      cpassword,
      uuid
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
    const result = await cusModal.findOne({
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
    const res = await cusModal.update(
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