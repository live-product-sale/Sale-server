/*
 * @Description: 搜索模块
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-19 12:48:02
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-19 12:54:06
 */
const router = require('koa-router')()
const searchService = require('../../controllers/seachService')
router.prefix('/search')

router.get('/key', searchService.search)

module.exports = router