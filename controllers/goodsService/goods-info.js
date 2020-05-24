/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:41:16
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 09:59:32
 */
const goodsModal = require('../../modal/goods/index')
const liveModal = require('../../modal/live')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')
const goodsInfo = require('../../modal/goods/goods.info')

class GoodsInfoService {
  /**
   *  获取商品详情
   * @param {*} ctx 
   */
  static async getGoodsInfo(ctx) {
    const { goods_id } = ctx.request.query
    const result = await goodsModal.findOne({
      where: { goods_id },
      include: [goodsInfo]
    })
    const liveInfo = await liveModal.findOne({
      where: { shop_id: result.shop_id },
      attributes: ["live_id"]
    })
    return ctx.body = uniformRes(resCode.SUCCESS, { result, live_id: liveInfo.live_id } )
  }
}
module.exports = GoodsInfoService