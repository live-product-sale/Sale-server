/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:24:19
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 10:03:34
 */
const { generateId } = require('../../util/utils')
const shopModal = require('../../modal/shop')
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
    return ctx.body = {
      code: '000000',
      msg: 'ok',
      data: result
    }
  }
  // 根据uid获取商店
  static async getShopInfo(ctx) {
    const { uid } = ctx.request.query
    const result = await shopModal.findAll({
      where: { uid }
    })
    return ctx.body = {
      code: "000000",
      data: result,
      msg: 'ok'
    }
  }
  //根据shop_id 获取信息
  static async getShopByShopId(ctx) {
    const { shop_id } = ctx.request.query
    const result = await shopModal.findOne({
      where: { shop_id }
    })
    return ctx.body = {
      code: "000000",
      data: result,
      msg: "ok"
    }
  }
}
module.exports = shopService
