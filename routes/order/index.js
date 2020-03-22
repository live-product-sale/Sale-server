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
// 订单模版数据
router.get('/orderModal', orderService.orderModal)
// 创建订单
router.post('/createOrder', orderService.createOrder)
// 获取订单总额
router.get('/payorder', orderService.getPayOrder)
// 确认支付
router.post('/payconfirm', orderService.confirePay)
// 订单列表
router.get('/orderList', orderService.getOrderList)
// 取消订单
router.post('/cancelOrder', orderService.cancelOrder)
// 删除订单
router.post('/deleteOrder', orderService.deleteOrder)
// 确认订单
router.post('/confirmOrder', orderService.confirmOrder)
// 评价订单
router.post('/assess', orderService.finishAssess)

module.exports = router