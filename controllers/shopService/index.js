/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:24:19
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-13 12:37:44
 */
const { generateId } = require('../../util/utils')
const shopModal = require('../../modal/shop')
const goods = require('../../modal/goods/index')
const goodsInfo = require('../../modal/goods/goodsInfo')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class shopService {
  // 用户创建商店
  static async createShop(ctx) {
    const data = ctx.request.body
    const shop_id = generateId()
    const result = await shopModal.create({
      shop_id,
      ...data
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
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
}
module.exports = shopService
