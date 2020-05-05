/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:31:31
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:40:35
 */
const goodsModal = require('../../modal/goods')
const sortModal = require('../../modal/rangesort')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class goodService {
  /**
   * 根据shop_id 获取商品信息
   * @param {*} ctx 
   */
  static async getGoodsByShopId(ctx) {
    const { shop_id } = ctx.request.query
    const result = await goodsModal.findAll({
      where: { shop_id, goods_state: 1 }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )  
  }
  /**
   * 添加商品
   * @param {*} ctx 
   */
  static async createGoods(ctx) {
    const data = ctx.request.body
    const goods_id = Date.now().toString().substr(6, 6)
                     + Math.random().toString().substr(2, 2)
    const result = await goodsModal.create({
      goods_id,
      ...data
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result ) 
  }
  /**
   * 根据goods_id 获取信息
   * @param {*} ctx 
   */
  static async getGoodsByGoodsId(ctx) {
    const { goods_id } = ctx.request.query
    const result = await goodsModal.findOne({
      where: { goods_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result ) 
  }
}
module.exports = goodService
