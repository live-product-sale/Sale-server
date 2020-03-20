/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:04:05
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-20 21:47:37
 */
const router = require('koa-router')()
const orderService = require('../../controllers/orderService')
router.prefix('/order')
router.get('/orderModal', orderService.orderModal)
router.post('/createOrder', orderService.createOrder)
router.get('/payorder', orderService.getPayOrder)
router.post('/payconfirm', orderService.confirePay)
router.get('/orderList', orderService.getOrderList)
router.post('/cancelOrder', orderService.cancelOrder)
router.post('/deleteOrder', orderService.deleteOrder)
router.post('/confirmOrder', orderService.confirmOrder)
router.post('/assess', orderService.finishAssess)
module.exports = router