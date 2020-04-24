/*
 * @Description: 对用户进入直播间和离开直播间记录时间戳
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-04-22 20:34:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-22 20:46:25
 */
const router = require('koa-router')()
const LiveService = require('../../controllers/liveServices/customerService')
router.prefix('/live/buried')

router.post('/enter', LiveService.enterLiveWithUser )
router.post('/out', LiveService.outLiveWithUser )

module.exports = router