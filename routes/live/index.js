const router = require('koa-router')()
const liveServices = require('../../controllers/liveServices')
router.prefix('/live')

// 创建直播室
router.post('/create', liveServices.createLive)  
// 修改直播室信息 
router.post('/revise', liveServices.reviseLive)
// 获取直播时信息
router.get('/achieve', liveServices.achieveLive)
// 删除直播室信息
router.post('/delete', liveServices.deleteLive)

module.exports = router