const {
  createToken,
  generateId,
  uniformRes
} = require('../../util/utils')
const { resCode, errMsg } = require('../../util/errorCode')
const userInfo = require('../../modal/user/userinfo')
const userModal = require('../../modal/user')

class cusController {
  //更新登陆状态
  static async updateLogin(ctx) {
    const { uid, cphone } = ctx.request.body
    try {
      const result = await userModal.findOne({
        where: { uid, cphone },
        attributes: ["cpassword"]
      })
      const cpassword = result.cpassword
      const Info = await userModal.findOne({
        where: { cphone, cpassword },
        include: [userInfo],
        attributes: { exclude: ["cpassword"] }
      })
      const data = {
        token: createToken({ cphone, cpassword }),
        userinfo: Info
      }
      result ? ctx.body = uniformRes(resCode.SUCCESS, data, errMsg[resCode.SUCCESS]) : ''
      return;
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 处理登陆
  static async login(ctx) {
    const { cphone, cpassword } = ctx.request.body
    try {
      const result = await userModal.findOne({
        where: { cphone },
        include: [userInfo]
        // attributes: ['cpassword']
      })
      // console.log(result)
      if (result.cpassword === cpassword) {
        const data = { token: createToken({ cphone, cpassword }), userinfo: result }
        return ctx.body = uniformRes(resCode.SUCCESS, data, errMsg[resCode.SUCCESS])
      } else {
        return ctx.body = uniformRes(resCode.USER_PASSWORD_ERR, null, errMsg[resCode.USER_PASSWORD_ERR])
      }
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    } 
  }
  // 处理注册
  static async register(ctx) {
    const { cpassword, cphone } = ctx.request.body
    const uid = generateId()
    try {
      const user = await userModal.findOne({
        where: { cphone }
      })
      await userModal.create(
        { uid, cphone, cpassword },
      )
      await userInfo.create({ uid })
      if (!user) {
        return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
      } else {
        return ctx.body = uniformRes(resCode.EXIST, null, errMsg[resCode.EXIST])
      }
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 修改密码
  static async modifyPass(ctx) {
    const { cphone, cpassword } = ctx.request.body
    if (!cphone) {
      return ctx.body = uniformRes(resCode.LACK, null, errMsg[resCode.LACK])
    }
    try {
      const result = await userModal.findOne({
        where: { cphone }
      })
      if (!result) {
        return ctx.body = uniformRes(resCode.EXIST, null, errMsg[resCode.EXIST])
      }
      const res = await userModal.update(
        { cpassword },
        { where: { cphone } })
      if (res) {
        return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
      }
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 获取用户信息
  static async getUserInfo(ctx) {
    const { uid } = ctx.request.query
    try {
      const result = await userModal.findOne({
        where: { uid },
        attributes: { exclude: ["cpassword"] },
        include: [userInfo]
      })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    } 
  }
  // 完善用户信息
  static async perfectUserInfo(ctx) {
    const { uid, name, gender, avatar } = ctx.request.body
    try {
      const res = await userInfo.findOne({
        where: { uid }
      })
      if (!res) {
        await userInfo.create({ uid, name, gender, avatar })
      } else {
        await userInfo.update({ name, gender, avatar }, {
          where: { uid }
        })
      }
      return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }

  static async getUserNameByuid(ctx) {
    const { uid } = ctx.request.query
    try {
      const result = await userInfo.findOne({
        where: { uid },
        attributes: ["name", "avatar"]
      })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 更新密码
  static async updatePassword(ctx) {
    const { uid, cphone, oldPassword, newPassword } = ctx.request.body
    try {
      const result = await userModal.findOne({
        where: { uid, cphone },
        attributes: ["cpassword"]
      })
      if (result.cpassword === oldPassword) {
        await userModal.update({
          cpassword: newPassword
        }, { where: { uid, cphone } })
        return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
      } else {
        return ctx.body = uniformRes(resCode.EXIST, null, errMsg[resCode.EXIST])
      }
    } catch (err) {
      console.log(err) 
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
}

module.exports = cusController