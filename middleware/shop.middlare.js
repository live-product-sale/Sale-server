/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-24 09:43:06
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 12:32:18
 */ 
const shopModal = require('../modal/shop/index')
const followShop = require('../modal/shop/follow.shop')

const getShopAmount = async (ctx, next) => {
    const data = ctx.request.body
    const constraint = { shop_id: data.shop_id }
    const result = await shopModal.findOne({
      where: constraint,
      attributes: ["shop_amount"]
    })
    ctx.request.body = { ...data, amount: Number(result.shop_amount)}
    await next()  
}
const getShopViews = async (ctx, next) => {
  const data = ctx.request.body
  const constraint = { shop_id: data.shop_id }
  const result = await shopModal.findOne({
    where: constraint,
    attributes: ["shop_view"]
  })
  ctx.request.body = { ...data, views: Number(result.shop_view)}
  await next()  
}
const getShopSales = async (ctx, next) => {
  const { shop_id } = ctx.request.body
  const constraint = { shop_id: shop_id }
  const result = await shopModal.findOne({
    where: constraint,
    attributes: ["shop_sales"]
  })
  await shopModal.update({
    shop_sales: Number(result.shop_sales) + 1
  }, {where: { shop_id }})
  await next()  
}
module.exports = {
  getShopAmount,
  getShopViews,
  getShopSales
}