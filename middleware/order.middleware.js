/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-24 11:38:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-26 22:13:39
 */ 
const orderModal = require('../modal/order/index')
const shopModal = require('../modal/shop/index')
const payOrder = require('../modal/order/order.pay')

const calculateTotalPrice = async (ctx, next) => {
  const { shopInfo, goodsInfo, uid, address_id } = ctx.request.body
  let total_price = 0
  const order_id = Number(Math.random().toString().substr(3, 5) + Date.now().toString().substr(9))
  shopInfo.forEach(item => {
      item["order_id"] = order_id,
      item["uid"] = uid,
      item["address_id"] = address_id
  })
  goodsInfo.forEach(item => {
    item["order_id"] = order_id
    total_price += Number(item.goods_price) * Number(item.goods_num).toFixed(2)
  })
  ctx.request.body  = { shopInfo, goodsInfo, uid, total_price, order_id  }
  await next()
}
const getOrderTotalPrice = async (ctx, next) => {
  const { uid, order_id } = ctx.request.body
  orderModal.findOne({
    where: { uid, order_id },
    attributes: ["shop_id"],
    include: { model: payOrder, attributes: ["total_price"]}
  }).then(res => {
    shopModal.findOne({
        where: {shop_id: res.shop_id},
        attributes: ["shop_money"]
    }).then(shop => {
      console.log(shop.shop_money, res)
      shopModal.update({
        shop_money: Number(shop.shop_money)+ Number(res.payOrder.total_price)
      }, { where: {shop_id: res.shop_id} })
    })
  })
  await next()
}
module.exports = {
  calculateTotalPrice,
  getOrderTotalPrice
}