/*
 * @Description: 购物车中间件
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-09 09:33:23
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-09 09:44:03
 */
const cartModal = require('../modal/cart')
const { uniformRes } = require('../util/utils')
const { resCode } = require('../util/errorCode')

const cartAddGoods = async (ctx, next) => {
  const data = ctx.request.body
  const result = await cartModal.findAll({
    where: {
      uid: data.uid,
      shop_id: data.shop_id,
      goods_id: data.goods_id,
      net_weight: data.net_weight,
      specification: data.specification
    }
  })
  if(result.length === 0) {
    await next()
  } else {
    let goods_num = result[0].goods_num ? parseInt(result[0].goods_num) : 0
    let num = goods_num + parseInt(data.goods_num)
    await cartModal.update(
      { goods_num: num }, 
      { where: { cart_id: result[0].cart_id } })
  }
  return ctx.body = uniformRes(resCode.SUCCESS, null )
}
module.exports = {
  cartAddGoods
}