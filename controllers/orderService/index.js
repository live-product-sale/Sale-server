/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:02:35
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 12:28:44
 */
const orderModal = require('../../modal/order')
const orderDetail = require('../../modal/order/order.detail')
const payOrder = require('../../modal/order/order.pay')
const cartMoal = require('../../modal/cart')
const shopMoal = require('../../modal/shop/index')
const commentModal = require('../../modal/comment')
const Op = require('sequelize').Op
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')
 
 // 处理时间
function dealTime() {
  const myDate = new Date()
  let array = myDate.toLocaleDateString().split("/")
  let year = array[0]
  let month = array[1]
  let day = array[2]
  let time = myDate.toLocaleTimeString().split(":")
  let hour = time[0]
  let minute = time[1]
  return `${year}-${month}-${day},${hour}:${minute}`
}
class orderService {
  // 订单数据模版
  static async orderModal(ctx) {
    const { uid } = ctx.request.query
    const cartChecked = await cartMoal.findAll({
      where: { uid, goods_checked: true },
      attributes: { exclude: ["uid", "goods_stock", "cart_id", "id"] }
    })
    const shopId = cartChecked.map(item => {
      return item.shop_id
    })
    const whereObj = { shop_id: { [Op.or]: shopId }}
    const shopInfo = await shopMoal.findAll({
      where: whereObj,
      attributes: ["shop_id", "shop_name", "shop_avatar"]
    })
    shopInfo.forEach(item => item.dataValues["goods"] = [])
    shopInfo.forEach(item => {
       cartChecked.forEach( iitem => {
         if(item.shop_id == iitem.shop_id) {
           item.dataValues.goods.push(iitem.dataValues)
         }
       })
    })
    return ctx.body = uniformRes(resCode.SUCCESS, shopInfo )
  }

  // 创建订单
  static async createOrder(ctx) {
    const { shopInfo, goodsInfo, uid, total_price, order_id } = ctx.request.body
    await orderModal.bulkCreate(shopInfo)
    await orderDetail.bulkCreate(goodsInfo)
    await payOrder.create({ order_id, uid, total_price })
    ctx.body = uniformRes(resCode.SUCCESS, { order_id } )
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
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }

  //确认支付
  static async confirePay(ctx) {
    const { uid, pay_type, order_id } = ctx.request.body
    await orderModal.update(
      { order_state: 2 },
      { where: { order_id, uid } })
    const result = await payOrder.update({
      pay_type,
      isSuccess: true
    }, {
      where: { uid, order_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }

  // 获取订单数据根据order_state
  static async getOrderList(ctx) {
    const { order_state, uid, offset, limit } = ctx.request.query
    let orderList = []
    if (order_state === '0') {
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
      return ctx.body = uniformRes(resCode.SUCCESS, { orderList, orderGoods } )
  }

  // 取消订单
  static async cancelOrder(ctx) {
    const { order_id, order_state, uid } = ctx.request.body
    await orderDetail.destroy({
      where: { order_id }
    })
    await payOrder.destroy({
      where: { uid, order_id }
    })
    await orderModal.destroy({
      where: { order_id, order_state, uid }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }

  // 删除订单
  static async deleteOrder(ctx) {
    const { order_id, uid } = ctx.request.body
     await orderDetail.destroy({
      where: { order_id }
    })
    await payOrder.destroy({
      where: { order_id, uid }
    })
    await orderModal.destroy({
      where: { order_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }

  // 确认订单
  static async confirmOrder(ctx) {
    const { order_id, uid, shop_id } = ctx.request.body
    await orderModal.update({
      order_state: 4
    }, { where: { order_id, uid, shop_id } })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }

  // 完成评论
  static async finishAssess(ctx) {
    const data= ctx.request.body
    const comment_date = dealTime()
    await orderModal.update({
      order_state: 0
    }, { where: { order_id: data.order_id, uid: data.uid } })
    await commentModal.create({...data, comment_date })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }

  // 根据shop_id 获取订单
  static async getOrderByshop(ctx) {
    const { shop_id } = ctx.request.query
    const result = await orderModal.findAll({
      where: { shop_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
}
module.exports = orderService