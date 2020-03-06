/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:24:19
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 17:50:56
 */
const { generateId } = require('../../util/utils')
const shopModal = require('../../modal/shop')
class shopService {
  // 用户创建商店
  static async createShop(ctx) {
    const { uid, shop_name, shop_avatar } = ctx.request.body
    const shop_id = generateId()
    // console.log(uid, shop_avatar, shop_name)
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
    // console.log(uid)
    const result = await shopModal.findAll({
      where: { uid }
    })
    return ctx.body = {
      code: "000000",
      data: result,
      msg: 'ok'
    }
  }
}
module.exports = shopService
