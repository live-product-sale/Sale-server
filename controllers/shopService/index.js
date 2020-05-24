/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:24:19
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 11:00:53
 */
const { generateId } = require('../../util/utils')
const shopModal = require('../../modal/shop')
const goods = require('../../modal/goods/index')
const goodsInfo = require('../../modal/goods/goods.info')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class shopService {
  // 根据uid获取商店
  static async getShopInfo(ctx) {
    const { uid } = ctx.request.query
    const result = await shopModal.findAll({
      where: { uid }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
  //根据shop_id 获取信息
  static async getShopByShopId(ctx) {
    const {shop_id, goods_id} = ctx.request.query
    const whereObj = { shop_id: shop_id }
    const includeObj = [{model: goods, where: { goods_id }, attributes: ["goods_name", "goods_avatar", "goods_id"]}]
    const attributesObj = ["shop_name", "shop_avatar", "instructions", "shop_id"]
    const result = await shopModal.findOne({
      where: whereObj,
      include: includeObj,
      attributes: attributesObj
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
  // 根据shop_class获取商品goodsclass
  static async getGoodsClass(ctx) {
    const { shop_class } = ctx.request.query
    const result = await shopModal.findOne({
      where: { shop_class },
      attributes: [],
      include: [{ model: goods, attributes: ["goods_class", "goods_id"]}]
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  // 关注商店
  static async heartShop(ctx) {
    const { shop_id, amount } = ctx.request.body
    // console.log(shop_id, amount)
    const result = await shopModal.update(
      {
       shop_amount: amount + 1
      }, { where: { shop_id } })
    ctx.body = uniformRes(resCode.SUCCESS, null)
  }
  // 更新店铺访问量
  static async updateViews(ctx) {
    const { shop_id, views } = ctx.request.body
    // console.log(shop_id, views, "view")
    await shopModal.update({
      shop_view: views + 1
   }, {
     where: { shop_id }
   })
   ctx.body = uniformRes(resCode.SUCCESS, null)
  }
}
module.exports = shopService
