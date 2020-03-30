/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:31:31
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 20:06:12
 */
const goodsModal = require('../../modal/goods')
const sortModal = require('../../modal/rangesort')
const { ResFormat } = require('../../util/utils')

class goodService {
   // 根据shop_id 获取商品信息
   static async getGoodsByShopId(ctx) {
       const { shop_id } = ctx.request.query
       const result = await goodsModal.findAll({
         where: { shop_id }
       })
       return ctx.body = ResFormat("000000", result, "ok")
   }
   // 添加商品
   static async createGoods(ctx) {
     const data = ctx.request.body
     const goods_id = Date.now().toString().substr(6,6)+Math.random().toString().substr(2,2)
     const result = await goodsModal.create({
       goods_id,
       ...data
     })
     return ctx.body = ResFormat("000000", result, "添加成功")
   }
   // 根据goods_id 获取信息
   static async getGoodsByGoodsId(ctx) {
     const { goods_id} = ctx.request.query
     const result = await goodsModal.findOne({
       where: { goods_id }
     })
     return ctx.body = ResFormat("000000", result, "ok")
   }
}
module.exports = goodService
