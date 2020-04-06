/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:31:31
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-06 22:26:18
 */
const goodsModal = require('../../modal/goods')
const sortModal = require('../../modal/rangesort')
const { ResFormat } = require('../../util/utils')
const { errMsg, resCode } = require('../../util/errorCode')

class goodService {
  // 根据shop_id 获取商品信息
  static async getGoodsByShopId(ctx) {
    const { shop_id } = ctx.request.query
    const result = await goodsModal.findAll({
      where: { shop_id }
    })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
  // 添加商品
  static async createGoods(ctx) {
    const data = ctx.request.body
    const goods_id = Date.now().toString().substr(6, 6) + Math.random().toString().substr(2, 2)
    const result = await goodsModal.create({
      goods_id,
      ...data
    })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
  // 根据goods_id 获取信息
  static async getGoodsByGoodsId(ctx) {
    const { goods_id } = ctx.request.query
    const result = await goodsModal.findOne({
      where: { goods_id }
    })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
}
module.exports = goodService
