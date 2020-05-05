/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:41:16
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-28 18:47:31
 */
const goodsInfoModal = require('../../modal/goods/goodsInfo')
const goodsModal = require('../../modal/goods/index')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class GoodsInfoService {
  /**
   * 添加商品详情
   * @param {*} ctx 
   */
  static async increaseInfo(ctx) {
    const data = ctx.request.body
    const result = await goodsInfoModal.create(data)
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
  /**
   *  获取商品详情
   * @param {*} ctx 
   */
  static async getGoodsInfo(ctx) {
    const { goods_id } = ctx.request.query
    const detail = await goodsInfoModal.findAll({
      where: { goods_id }
    })
    const result = await goodsModal.findOne({
      where: { goods_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, { result, detail } )
  }
}
module.exports = GoodsInfoService