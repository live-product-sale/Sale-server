/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:41:16
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-06 22:25:09
 */
const goodsInfoModal = require('../../modal/goods/goodsInfo')
const goodsModal = require('../../modal/goods/index')
const { ResFormat } = require('../../util/utils')
const { errMsg, resCode } = require('../../util/errorCode')

class GoodsInfoService {
  // 添加商品详情
  static async increaseInfo(ctx) {
    const data = ctx.request.body
    const result = await goodsInfoModal.create(data)
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
  // 获取商品详情
  static async getGoodsInfo(ctx) {
    const { goods_id } = ctx.request.query
    const detail = await goodsInfoModal.findAll({
      where: { goods_id }
    })
    const result = await goodsModal.findOne({
      where: { goods_id }
    })
    return ctx.body = ResFormat(resCode.SUCCESS, { result, detail }, errMsg[resCode.SUCCESS])
  }
}
module.exports = GoodsInfoService