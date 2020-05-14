const router = require('koa-router')()
const CusServices = require('../../controllers/liveServices/customerService')
router.prefix('/live')

router.get('/liveList', CusServices.getLiveList)
// 获取拉流信息
router.get('/livePlay', CusServices.getLivePlay)
// 关注或取消直播间
router.post('/attention', CusServices.attentionLive)
// 获取关注的直播间
router.get('/attentionList', CusServices.getAttentionLive)
// 获取直播间根据sort_id , range_id
router.get('/shopclass', CusServices.getLiveByshopClass)
// 更新直播间观众人数
router.post('/view', CusServices.updateViewMount)

module.exports = router