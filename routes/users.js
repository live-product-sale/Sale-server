const router = require('koa-router')()
const user = require('../db/users/index')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'

})
const per = { name: '张三', password: '12345', phone: '12345678911'}
router.get('/bar', async (ctx) => {
  await user.createUser(per)
  ctx.body = 'this is a users/bar response'
})

module.exports = router
