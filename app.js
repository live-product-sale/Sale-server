const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const compress = require('koa-compress')
const koaJwt = require('koa-jwt')   // 验证token

const sendHandle = require('./middleware/sendHandle')
const errorHandle = require('./middleware/errorHandle')
const countLogger = require('./middleware/logger')
const allRoutes = require('./routes/index')

// error handler
onerror(app)

// 是服务端可以 获取ctx.request.body 中的数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 头部压缩
const options = { threshold: 2048 }
app.use(compress(options))

app.use(json())
app.use(countLogger)
app.use(sendHandle())
app.use(errorHandle)
//验证token
app.use(koaJwt({
  secret: '19970926ly'
}).unless({ path: [/\/user\/login/, /\/user\/register/,/\/live\/add/,/\/live\/alllive/]}))

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// routes
app.use(allRoutes.routes(), allRoutes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
