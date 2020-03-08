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
class GoodsInfoService {
  // 添加商品详情
     static async increaseInfo(ctx) {
       const data = ctx.request.body
      //  console.log(data)
       const result = await goodsInfoModal.create(data)
       return ctx.body = {
         code: "000000",
         data: result,
         msg: "ok"
       }
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
      //  console.log(result)
       return ctx.body = { 
         code: "000000",
         data: { result, detail },
         msg: "ok"
       }
     }
}
module.exports = GoodsInfoService