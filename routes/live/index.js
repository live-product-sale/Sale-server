const router = require('koa-router')()
const liveServices = require('../../controllers/businessServices/liveController')
router.prefix('/live')

router.post('/add', liveServices.addTolive)
router.get('/alllive', liveServices.getAllLive)

module.exports = router