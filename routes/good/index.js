/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:54:45
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 17:51:52
 */
const router = require('koa-router')()
const goodService = require('../../controllers/goodService')
router.prefix('/goods')
// router.post('/add', goodService)


module.exports = router