/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:25:46
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-23 11:53:52
 */
const router = require('koa-router')()
const rangeService = require('../../controllers/sortServices')
router.prefix('/sort')
// 根据直播间类型获取分类名称
router.get('/range_id', rangeService.getSortByRange)
// 获取直播间全部范围
router.get('/range', rangeService.getAllRange)
// 根据rang_id 获取 sort
router.get('/sortByrangeId', rangeService.getSortByRangeId)


module.exports = router