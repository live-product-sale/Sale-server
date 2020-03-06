/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:04:05
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-04 14:05:12
 */
const router = require('koa-router')()
const orderService = require('../../controllers/orderService')
router.prefix('/order')

module.exports = router