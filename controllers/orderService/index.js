/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:02:35
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 13:59:02
 */
const orderModal = require('../../modal/order')
const orderDetail = require('../../modal/order/order-detail')
const payOrder = require('../../modal/order/order-pay')
const cartMoal = require('../../modal/cart')
const shopMoal = require('../../modal/shop')
const Op = require('sequelize').Op

class orderService {
   static async orderModal(ctx) {
     const { uid } = ctx.request.query
     const cartChecked = await cartMoal.findAll({
       where: { uid, goods_checked: true },
       attributes: { exclude: ["uid", "goods_stock", "cart_id"]}
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
     return ctx.body = {
       code: "000000",
       data: shopInfo,
       msg: "ok"
     } 
   }
   // 创建订单
   static async createOrder(ctx) {
     const { shopInfo, goodsInfo, uid } = ctx.request.body
     shopInfo.forEach(item => {
       item["order_id"] = Date.now().toString().substr(8,6)+Math.random().toString().substr(8,4)
       item["uid"] = uid
     })
     let detail = []
     goodsInfo.forEach(item => {
       item.map(iitem => {
         detail.push({...iitem, uid})
       })
     })
     const result = await orderModal.bulkCreate(shopInfo)
     detail.forEach(item => {
       result.forEach(iitem => {
         if(iitem.shop_id === item.shop_id) {
           item["order_id"] = iitem.order_id
         }
       })
     })
     await orderDetail.bulkCreate(detail)
     let orderPay = []
     detail.forEach(item => {
       const temp = {}
       temp["order_id"] = item.order_id
       temp["uid"] = uid
       temp["total_price"] = Number(item.goods_price) * Number(item.goods_num)
       orderPay.push(temp)
     })
     await payOrder.bulkCreate(orderPay)
     return ctx.body = {
       code: "000000",
       data: null,
       msg: "创建成功"
     }
   }
   // 获取为支付的订单
   static async getPayOrder(ctx) {
     const { uid } = ctx.request.query
     const result = await payOrder.findAll({
       where: {
         uid,
         isSuccess: false
       }
     })
     return ctx.body = { code: "000000", data: result, msg: "ok" }
   }
   //确认支付
   static async confirePay(ctx) {
     const { uid , pay_type, order_id } = ctx.request.body
     const result = await payOrder.update({
       pay_type,
       isSuccess: true
     }, {
       where: { uid }
     })
     return ctx.body = {
       code: "000000",
       data: result,
       msg: "ok"
     }
   }
}
module.exports = orderService