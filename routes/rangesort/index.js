/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:25:46
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 21:25:29
 */
const router = require('koa-router')()
const rangeService = require('../../controllers/sortServices')
router.prefix('/sort')
router.get('/range_id', rangeService.getSortByRange)

module.exports = router