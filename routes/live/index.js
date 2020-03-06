const router = require('koa-router')()
const BusServices = require('../../controllers/liveServices/businessService ')
router.prefix('/live')

// 创建直播室
router.post('/create', BusServices.createLive)  
// 根据商店shop_Id获取直播间
router.get('/liveroom', BusServices.getLiveByShopId)
// 根据直播live_id获取信息
router.get('/liveItem', BusServices.getLiveById)
// 根据live_id开始或结束直播
router.get('/liveStart', BusServices.startOrEndLive)

module.exports = router