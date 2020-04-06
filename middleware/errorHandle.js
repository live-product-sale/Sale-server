const { ResFormat } = require('../util/utils')
const { resCode, errMsg } = require('../util/errorCode')

const errorHandle = (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      return ctx.body = ResFormat(resCode.UNLOGIN, null, errMsg[resCode.UNLOGIN])
    } else {
      throw err
    }
  })
}
module.exports = errorHandle