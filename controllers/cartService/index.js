/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:40:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-08 19:21:53
 */
const cartModal = require('../../modal/cart')
const Op = require('sequelize').Op
class cartService {
  //根据用户id 获取购物车信息
  static async getCart(ctx) {
    const { uid } = ctx.request.query
    const result = await cartModal.findAll({
      where: { uid }
    })
    return ctx.body = {
      code: "000000",
      data: result,
      msg: 'OK'
    }
  }
  // 添加商品到购物车
  static async increaseCart(ctx) {
    const data = ctx.request.body
    const result = await cartModal.findAll({
      [Op.and] : [
        {uid: data.uid}, 
        {shop_id: data.shop_id},
        {goods_id: data.goods_id},
        {net_weight: data.net_weight},
        {specification: data.specification}
      ]
    })
    if(result.length > 0) {
      await cartModal.update({
        goods_num: parseInt(result[0].goods_num) + parseInt(data.goods_num)
      }, {
        where: {
          cart_id: result[0].cart_id
        }
      })
      return ctx.body = {
        code: "000000",
        data: null,
        msg: "ok"
      }
    }
    const cart_id = Date.now().toString().substr(6,6)+Math.random().toString().substr(2,2)
    data["cart_id"] = cart_id
    await cartModal.create(data)
    return ctx.body = {
      code: "000000",
      data: null,
      msg: "ok"
    }
  }
  // 删除商品在购物车中
  static async deleteGoodsInCart(ctx) {
    const { uid, cart_id } = ctx.request.body
    await cartModal.destroy({
      where: {
        uid,
        cart_id
      }
    })
    return ctx.body = {
      code: "000000",
      data: null,
      msg: "删除成功"
    }
  }
}

module.exports = cartService