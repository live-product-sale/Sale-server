/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:40:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-30 20:21:02
 */
const cartModal = require('../../modal/cart')
// const Op = require('sequelize').Op
const { ResFormat } = require('../../util/utils')

class cartService {
  //根据用户id 获取购物车信息
  static async getCart(ctx) {
    const { uid } = ctx.request.query
    const result = await cartModal.findAll({
      where: { uid }
    })
    return ctx.body = ResFormat("000000", result, "ok")
  }
  // 添加商品到购物车
  static async increaseCart(ctx) {
    const data = ctx.request.body
    // console.log(data)
    const result = await cartModal.findAll({
      where : { 
        shop_id: data.shop_id,
        uid: data.uid,
        goods_id: data.goods_id,
        net_weight: data.net_weight,
        specification: data.specification,
      }
    })
    // console.log(result)
    if(result.length > 0) {
      await cartModal.update({                                                                                         
        goods_num: parseInt(result[0].goods_num) + parseInt(data.goods_num)
      }, {
        where: {
          cart_id: result[0].cart_id
        }
      })
      return ctx.body = ResFormat("000000", null, "ok")
    } else {
      const cart_id = Date.now().toString().substr(6,6)+Math.random().toString().substr(2,2)
      data["cart_id"] = cart_id
      await cartModal.create(data)
      return ctx.body = ResFormat("000000", null, "添加成功")
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
    return ctx.body = ResFormat("000000", null, "删除成功")
  }
  // 改变购物车中的状态
  static async changCartstatus(ctx) {
     const { cart_id, status } = ctx.request.query
     const result = await cartModal.update({
       goods_checked: status
     }, { where: { cart_id }})
     return ctx.body = ResFormat("000000", result, "修改成功")
  }
  // 改变购物车中商品的数量
  static async changCartGoodsNum(ctx) {
    const { cart_id, goods_num } = ctx.request.query
    await cartModal.update({
      goods_num
    }, { where: { cart_id }})
    return ctx.body = ResFormat("000000", null, "修改成功")
  }
  // 清空购物车
  static async  deleteAllCart(ctx) {
    const { uid } = ctx.request.body
    await cartModal.destroy({
      where: {uid}
    })
    return ctx.body = ResFormat("000000", null, "删除成功")
  }
}

module.exports = cartService