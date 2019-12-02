const router = require('koa-router')()
const user = require('../services/customerServices/index')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
const per = { name: 'xiaosan', password: '12345'}
router.get('/bar',async function (ctx, next) {
  await user.createUser(per)
  ctx.body = 'this is a users/bar response'
})

module.exports = router
