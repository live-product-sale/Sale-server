const { 
  createToken, 
  generateId,
  ResFormat
} = require('../../util/utils')
const userInfo = require('../../modal/user/userinfo')
const userModal = require('../../modal/user')

class cusController {
  //更新登陆状态
  static async updateLogin (ctx) {
    const { uid, cphone } = ctx.request.body
    const result = await userModal.findOne({
      where: { uid, cphone},
      attributes: ["cpassword"]
    })
    const cpassword = result.cpassword
    const Info = await userModal.findOne({
      where: { cphone, cpassword },
      include: [userInfo],
      attributes: { exclude: ["cpassword"]}
    })
    if(result) {
      return ctx.body = {
          code: "000000",
          data: {
            token: createToken({cphone, cpassword }),
            userinfo: Info
          },
          msg: "更新登陆状态"
      }
    }
  }
  // 处理登陆
  static async login(ctx) {
    const { cphone, cpassword } = ctx.request.body
    const result = await userModal.findOne({
      where: { cphone, cpassword },
      include: [userInfo],
      attributes: { exclude: ["cpassword"]}
    })
    if(result !== null) {
      const data = { token: createToken({cphone, cpassword}), userinfo: result }
      return ctx.body = ResFormat("000000", data, '登陆成功')
    } else {
      return ctx.body = ResFormat("000001", null, '账号或密码错误')
    } 
  }
  // 处理注册
  static async register(ctx) {
    const { cpassword, cphone } = ctx.request.body
    const uid = generateId()
    const result = await userModal.create(
      { uid, cphone, cpassword },
      { include: [userInfo]}
    )
    await userInfo.create({ uid })
    if(result) {
      return ctx.body = ResFormat("000000", null, '注册成功')
    } else {
      return ctx.body = ResFormat("000001", null, '注册失败')
    }
  }
  // 修改密码
  static async modifyPass(ctx) {
    const { cphone, cpassword } = ctx.request.body
    if(!cphone) {
      return ctx.body = ResFormat("000002", null, '手机号为空')
    }
    const result = await userModal.findOne({
      where: { cphone }
    })
    if(!result) {
       return ctx.body = ResFormat("000003", null, '该账号不存在')
    }
    const res = await userModal.update(
      { cpassword },
      { where: { cphone } })
    if(res) {
      return ctx.body = ResFormat("000000", null, '修改成功')
    }
  }
  // 获取用户信息
  static async getUserInfo(ctx) {
    const {uid} = ctx.request.query
    const result = await userModal.findOne({
      where: { uid },
      attributes: { exclude: ["cpassword"]},
      include: [userInfo]
    })
    return ctx.body = ResFormat("000000", result, 'ok')
  }
  // 完善用户信息
  static async perfectUserInfo(ctx) {
    const {uid, name, gender, avatar} = ctx.request.body
    const res = await userInfo.findOne({ 
      where: { uid }
    })
    if(!res) {
      await userInfo.create({ uid, name, gender, avatar})
    } else {
      await userInfo.update({name, gender, avatar}, {
        where: {uid}
      })
    }
    return ctx.body = ResFormat("000000", null, 'ok')
  }

  static async getUserNameByuid(ctx) {
    const { uid } = ctx.request.query
    const result = await userInfo.findOne({
      where: { uid },
      attributes: ["name", "avatar"] 
    })
    return ctx.body = ResFormat("000000", result, 'ok')
  }

  static async updatePassword(ctx) {
    const {uid, cphone, oldPassword, newPassword} = ctx.request.body
    const result = await userModal.findOne({
      where: { uid, cphone },
      attributes: ["cpassword"]
    })
    if(result.cpassword === oldPassword) {
      await userModal.update({
        cpassword: newPassword
      }, { where: { uid, cphone }})
      return ctx.body = ResFormat("000000", null, "修改成功")
    } else {
      return ctx.body = ResFormat("000001", null, "原密码错误")
    }
  }
}

module.exports = cusController