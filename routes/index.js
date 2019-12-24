const router = require('koa-router')()
const userRoute = require('./user/index')
const liveRoute = require('./live/index')

router.prefix('/api/v1')
router.use(userRoute.routes(), userRoute.allowedMethods())
router.use(liveRoute.routes(), liveRoute.allowedMethods())

module.exports = router
