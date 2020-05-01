const router = require('koa-router')()
const BusServices = require('../../controllers/liveServices/businessService ')
const CusServices = require('../../controllers/liveServices/customerService')
router.prefix('/live')

// 创建直播室
router.post('/create', BusServices.createLive)
// 根据商店shop_Id获取直播间
router.get('/livebyshop', BusServices.getLiveByShopId)
// 根据直播live_id获取信息
router.get('/liveItem', BusServices.getLiveById)
// 根据live_id开始或结束直播
router.get('/liveStart', BusServices.startLive)
router.get('/liveEnd', BusServices.endLive)
// 获取直播列表
router.get('/liveList', CusServices.getLiveList)
// 获取拉流信息
router.get('/livePlay', CusServices.getLivePlay)
// 关注或取消直播间
router.post('/attention', CusServices.attentionLive)
// 获取关注的直播间
router.get('/attentionList', CusServices.getAttentionLive)
// 获取直播间根据sort_id , range_id
router.get('/sortAndrange', CusServices.getLiveBySort)
// 更新直播间观众人数
router.post('/view', CusServices.updateViewMount)

module.exports = router