/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:41:16
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 22:37:34
 */
const goodsInfoModal = require('../../modal/goods/goodsInfo')
const goodsModal = require('../../modal/goods/index')
const { Resformat } = require('../../util/utils')

class GoodsInfoService {
  // 添加商品详情
     static async increaseInfo(ctx) {
       const data = ctx.request.body
       const result = await goodsInfoModal.create(data)
       return ctx.body = Resformat("000000", result, "修改成功")
     }
     // 获取商品详情
     static async getGoodsInfo(ctx) {
       const { goods_id } = ctx.request.query
       const detail = await goodsInfoModal.findAll({
         where: { goods_id }
       })
       const result = await goodsModal.findOne({
         where: { goods_id}
       })
       return ctx.body = Resformat("000000", { result, detail }, "ok")
     }
}
module.exports = GoodsInfoService