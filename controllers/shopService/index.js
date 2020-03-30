/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:24:19
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 20:13:05
 */
const { generateId } = require('../../util/utils')
const shopModal = require('../../modal/shop')
const { ResFormat } = require('../../util/utils')

class shopService {
  // 用户创建商店
  static async createShop(ctx) {
    const { uid, shop_name, shop_avatar } = ctx.request.body
    const shop_id = generateId()
    const result = await shopModal.create({
      shop_id,
      uid,
      shop_name,
      shop_avatar
    })
    return ctx.body = ResFormat("000000", result, "创建成功")
  }
  // 根据uid获取商店
  static async getShopInfo(ctx) {
    const { uid } = ctx.request.query
    const result = await shopModal.findAll({
      where: { uid }
    })
    return ctx.body = ResFormat("000000", result, "ok")
  }
  //根据shop_id 获取信息
  static async getShopByShopId(ctx) {
    const { shop_id } = ctx.request.query
    const result = await shopModal.findOne({
      where: { shop_id }
    })
    return ctx.body = ResFormat("000000", result, "ok")
  }
}
module.exports = shopService
