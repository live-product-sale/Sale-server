/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:02:35
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-26 21:52:09
 */
const orderModal = require('../../modal/order')
const orderDetail = require('../../modal/order/order-detail')
const payOrder = require('../../modal/order/order-pay')
const cartMoal = require('../../modal/cart')
const shopMoal = require('../../modal/shop')
const Op = require('sequelize').Op
const { ResFormat } = require('../../util/utils')

class orderService {
  // 订单数据模版
   static async orderModal(ctx) {
     const { uid } = ctx.request.query
     const cartChecked = await cartMoal.findAll({
       where: { uid, goods_checked: true },
       attributes: { exclude: ["uid", "goods_stock", "cart_id", "id"]}
     })
     const shopId = cartChecked.map(item => { 
        return item.shop_id 
      })
     const shopInfo = await shopMoal.findAll({
       where: { shop_id: { 
         [Op.or]: shopId 
        }},
       attributes: { exclude: ["live_id", "uid", "id"] }
     })
     shopInfo.forEach(item => item.dataValues["goodsInfo"] = [])
     shopInfo.forEach(item => {
        cartChecked.forEach(iitem => {
          if(iitem.shop_id === item.shop_id) {
             item.dataValues.goodsInfo.push(iitem.dataValues)
         }
       })
     })
     return ctx.body = ResFormat("000000", shopInfo, "ok")
   }

   // 创建订单
   static async createOrder(ctx) {
     const { shopInfo, goodsInfo, uid, address_id } = ctx.request.body
    //  console.log(shopInfo, goodsInfo, uid, address_id)
     let total_price = 0
     const order_id = Date.now()
     shopInfo.forEach(item => {
        item["order_id"] = order_id, 
        item["uid"] = uid,
        item["address_id"] = address_id
        item.id = undefined
     })
     goodsInfo.forEach(item => {
       item["order_id"] = order_id
       total_price += Number(item.goods_price) * Number(item.goods_num).toFixed(2)
     })
    //  console.log(shopInfo)
     await orderModal.bulkCreate(shopInfo)
     await orderDetail.bulkCreate(goodsInfo)
     await payOrder.create({ order_id, uid, total_price })
     return ctx.body = ResFormat("000000", { order_id }, "创建成功")
   }

   // 获取未支付的订单
   static async getPayOrder(ctx) {
     const { uid, order_id } = ctx.request.query
     const result = await payOrder.findAll({
       where: {
         uid,
         order_id,
         isSuccess: false
       }
     })
     return ctx.body = ResFormat("000000", result , "ok")
   }

   //确认支付
   static async confirePay(ctx) {
     const { uid , pay_type, order_id } = ctx.request.body
     await orderModal.update(
       { order_state: 2 }, 
       { where: { order_id, uid }})
     const result = await payOrder.update({
       pay_type,
       isSuccess: true
     }, {
       where: { uid, order_id }
     })
     return ctx.body = ResFormat("000000", result , "ok")
   }

   // 获取订单数据根据order_state
   static async getOrderList(ctx) {
     const { order_state, uid, offset, limit } = ctx.request.query
     let orderList = []
     if(order_state === '0') {
        orderList = await orderModal.findAll({
        where: { uid },
        offset: parseInt(offset), 
        limit: parseInt(limit),
      })
     } else {
        orderList = await orderModal.findAll({
        where: { order_state, uid }
      })
     }
       
     let orderId = orderList.map(item => { return item.order_id })
     const orderGoods = await orderDetail.findAll({
       where: {
         order_id: {
           [Op.or]: orderId
         }
       }
     })
     return ctx.body = ResFormat("000000", {orderList, orderGoods } , "ok")
   }

   // 取消订单
   static async cancelOrder(ctx) {
     const { order_id, order_state, uid} = ctx.request.body
     await orderModal.destroy({
       where: { order_id, order_state, uid }
     })
     await orderDetail.destroy({
       where: {order_id}
     })
     await payOrder.destroy({
       where: {uid, order_id}
     })
     return ctx.body = ResFormat("000000", null , "ok")
   }

   // 删除订单
   static async deleteOrder(ctx) {
     const { order_id, uid} = ctx.request.body
     await orderModal.destroy({
       where: { order_id, uid }
     })
     await orderDetail.destroy({
       where: { order_id }
     })
     await payOrder.destroy({
       where: { order_id, uid}
     })
     return ctx.body = ResFormat("000000", null , "ok")
   }

   // 确认订单
   static async confirmOrder(ctx) {
     const { order_id, uid, shop_id } = ctx.request.body 
     await orderModal.update({
       order_state: 3
     }, { where: { order_id, uid, shop_id }})
     return ctx.body = ResFormat("000000", null , "ok")
   }

   // 完成评论
   static async finishAssess(ctx) {
     const { uid, order_id, score, assess} = ctx.request.body
    //  console.log(score, assess)
     await orderModal.update({
       order_state: 4
     }, { where: { order_id, uid }})
     return ctx.body = ResFormat("000000", null , "完成评论")
   }

   // 根据shop_id 获取订单
   static async getOrderByshop(ctx) {
     const { shop_id } = ctx.request.query
     const result = await orderModal.findAll({
       where: { shop_id}
     })
     return ctx.body = ResFormat("000000", result, "获取订单")
   }
}
module.exports = orderService