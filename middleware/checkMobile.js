const userModal = require('../modal/user')
const { uniformRes } = require('../util/utils')
const { resCode, errMsg } = require('../util/errorCode')
/**
 * 手机号是为空
 * @param {*} ctx 
 * @param {*} next 
 */
const IsMobile = async (ctx, next) => {
  let _cphone
  if (ctx.request.method === 'GET') {
    _cphone = ctx.request.query.cphone
  } else {
    _cphone = ctx.request.body.cphone
  }
  console.log(_cphone)
  if (_cphone === '') {
    return ctx.body = uniformRes(resCode.LACK, null, errMsg[resCode.LACK])
  }
  await next()
}
/**
 * 处理手机账号是否被注册
 * @param {*} ctx 
 * @param {*} next 
 */
const IsMobileRegisted = async (ctx, next) => {
  let cphone;
  if (ctx.request.method === 'GET') {
    cphone = ctx.request.query.cphone
  } else {
    cphone = ctx.request.body.cphone
  }
  const mob_res = await userModal.findOne({
    where: { cphone }
  })
  if (mob_res) {
    return ctx.body = uniformRes(resCode.EXIST, null, errMsg[resCode.EXIST])
  } else {
    await next()
  }
}
/**
 * 处理用户名是否被使用
 * @param {*} ctx 
 * @param {*} next 
 */
const IsNameUsed = async (ctx, next) => {
  const { cname } = ctx.request.body
  const cur_res = await userModal.findOne({
    where: { cname }
  })
  if (cur_res) {
    return ctx.body = uniformRes(resCode.EXIST, null, errMsg[resCode.EXIST])
  } else {
    await next()
  }
}
const IsName = async (ctx, next) => {
  const { cname } = ctx.request.body
  if (!cname) {
    return ctx.body = uniformRes(resCode.LACK, null, errMsg[resCode.LACK])
  }
  await next()
}
module.exports = {
  IsMobileRegisted,
  IsMobile,
  IsName,
  IsNameUsed
}