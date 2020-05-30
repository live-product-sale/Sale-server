/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-24 09:43:06
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-29 21:52:57
 */ 
const shopModal = require('../modal/shop/index')
const followShop = require('../modal/shop/follow.shop')
const { uniformRes } = require('../util/utils')
const { resCode, errMsg } = require('../util/errorCode')

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
// 用户是否关注商店
const IsAttrShopByUid = (shop_id, uid) => {
  return followShop.findOne({
    where: { shop_id, uid }
  }).then(res => {
    if(!res) {
      return false
    } else {
      return true
    }
  })
}
const AttrShop = async (ctx, next) => {
   const { shop_id, uid, isHeart} = ctx.request.body
   console.log(isHeart, shop_id, uid)
   if(!isHeart) {
    await followShop.create({
      shop_id, uid
    })
    await next()
   } else {
     await followShop.destroy({
       where: {shop_id, uid}
     })
     await next()
   }
}
module.exports = {
  getShopAmount,
  getShopViews,
  getShopSales,
  AttrShop,
  IsAttrShopByUid
}