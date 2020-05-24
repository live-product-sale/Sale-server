/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:04:05
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 12:44:24
 */
const router = require('koa-router')()
const orderService = require('../../controllers/orderService')
const { getShopSales } = require('../../middleware/shop.middlare')
const { calculateTotalPrice, getOrderTotalPrice } = require('../../middleware/order.middleware')
router.prefix('/order')

// 订单模版数据
router.get('/orderModal', orderService.orderModal)
// 创建订单
router.post('/createOrder', calculateTotalPrice,orderService.createOrder)
// 获取订单总额
router.get('/payorder', orderService.getPayOrder)
// 确认支付
router.post('/payconfirm',getOrderTotalPrice ,orderService.confirePay)
// 订单列表
router.get('/orderList', orderService.getOrderList)
// 取消订单
router.post('/cancelOrder', orderService.cancelOrder)
// 删除订单
router.post('/deleteOrder', orderService.deleteOrder)
// 确认订单
router.post('/confirmOrder', getShopSales, orderService.confirmOrder)
// 评价订单
router.post('/assess', orderService.finishAssess)
// 根据shop_id 获取 订单信息
router.get('/orderbyshop', orderService.getOrderByshop)

module.exports = router