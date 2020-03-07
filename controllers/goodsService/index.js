/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:31:31
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 09:30:29
 */
const goodsModal = require('../../modal/goods')
const sortModal = require('../../modal/sort')
class goodService {
   // 根据shop_id 获取商品信息
   static async getGoodsByShopId(ctx) {
       const { shop_id } = ctx.request.query
       const result = await goodsModal.findAll({
         where: { shop_id }
       })
       return ctx.body = { 
         code: "000000",
         data: result,
         msg: 'ok'
       }
   }
}
module.exports = goodService
