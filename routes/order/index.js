/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:04:05
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 13:50:49
 */
const router = require('koa-router')()
const orderService = require('../../controllers/orderService')
router.prefix('/order')
router.get('/orderModal', orderService.orderModal)
router.post('/createOrder', orderService.createOrder)
router.get('/payorder', orderService.getPayOrder)
router.post('/payconfirm', orderService.confirePay)
module.exports = router