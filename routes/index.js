const router = require('koa-router')()
const userRoute = require('./user/index')

router.prefix('/api/v1')
router.use(userRoute.routes(), userRoute.allowedMethods())

module.exports = router
