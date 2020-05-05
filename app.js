const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const compress = require('koa-compress')
const koaJwt = require('koa-jwt')   // 验证token
const koaBody = require('koa-body')  // 处理文件上传

const sendHandle = require('./middleware/sendHandle')
const errorHandle = require('./middleware/errorHandle')
const countLogger = require('./middleware/logger')
const allRoutes = require('./routes/index')

// error handler
onerror(app)

// 处理文件上传
app.use(koaBody({
  multipart: true,
  strict: false,       //设为false
  formidable: {
    maxFileSize: 1024 * 1024 * 1024
  }
}))

// 头部压缩
const options = { threshold: 2048 }
app.use(compress(options))
app.use(json())
app.use(countLogger)

//验证token
app.use(koaJwt({
  secret: '19970926ly'
}).unless({
  path: [/\/user\/login/, /\/user\/register/, /\/user\/modifyPass/]  // 注册登陆不需要token
}))
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// routes
app.use(errorHandle)
app.use(allRoutes.routes(), allRoutes.allowedMethods())

module.exports = app
