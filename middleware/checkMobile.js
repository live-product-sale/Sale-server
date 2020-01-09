const userModal = require('../modal/cus_modal')

/**
 * 手机号是为空
 * @param {*} ctx 
 * @param {*} next 
 */
const IsMobile = async (ctx, next) => {
  let _cphone
  if(ctx.request.method === 'GET') {
     _cphone = ctx.request.query.cphone
  } else {
     _cphone = ctx.request.body.cphone
  }
  console.log(_cphone)
  if(_cphone === '') {
    return ctx.body = {
      code: '000001',
      data: null,
      msg: '手机号不存在'
    }
  }
  await next()
}
/**
 * 处理手机账号是否被注册
 * @param {*} ctx 
 * @param {*} next 
 */
const IsMobileRegisted = async (ctx, next) => {
  const { cphone } = ctx.request.body
  const mob_res = await userModal.findOne({
    where: {
      cphone
    }
  })
  if(mob_res) {
    return ctx.body = {
      code: '000003',
      data: null,
      msg: '该手机已注册'
    }
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
    where: {
      cname
    }
  })
  if(cur_res) {
    return ctx.body = {
      code: '000004',
      data: null,
      msg: '用户名重复'
    }
  } else {
    await next()
  }
}
const IsName = async (ctx, next) => {
  const { cname } = ctx.request.body
  if(!cname) {
    return ctx.body = {
      code: '000001',
      data: null,
      msg: '用户名为空'
    }
  }
  await next()
}
module.exports = {
  IsMobileRegisted,
  IsMobile,
  IsName,
  IsNameUsed
}