const router = require('koa-router')()
const userRoute = require('./user')
const liveRoute = require('./live')
const shopRoute = require('./shop')
const goodRoute = require('./goods')
const cartRoute = require('./cart')
const orderRoute = require('./order')
const addressRoute = require('./address')

router.prefix('/api/v1')
router.use(userRoute.routes(), userRoute.allowedMethods())
router.use(liveRoute.routes(), liveRoute.allowedMethods())
router.use(shopRoute.routes(), shopRoute.allowedMethods())
router.use(goodRoute.routes(), goodRoute.allowedMethods())
router.use(cartRoute.routes(), cartRoute.allowedMethods())
router.use(orderRoute.routes(), orderRoute.allowedMethods())
router.use(addressRoute.routes(), addressRoute.allowedMethods())

module.exports = router
