const { uniformRes } = require('../util/utils')
const { resCode } = require('../util/errorCode')

const errorHandle = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err)
    return ctx.body = uniformRes(resCode.ERROR, null)
  }
}
module.exports = errorHandle