/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:40:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-24 20:09:43
 */
const cartModal = require('../../modal/cart')
// const Op = require('sequelize').Op
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class cartService {
  /**
   * 根据用户id 获取购物车信息
   * @param {*} ctx 
   */
  static async getCart(ctx) {
    const { uid } = ctx.request.query
    const result = await cartModal.findAll({
      where: { uid }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
   
  }
  /**
   * 添加商品到购物车
   * @param {*} ctx 
   */
  static async increaseCart(ctx) {
    const data = ctx.request.body
    const result = await cartModal.findAll({
      where: {
        shop_id: data.shop_id,
        uid: data.uid,
        goods_id: data.goods_id,
        net_weight: data.net_weight,
        specification: data.specification,
      }
    })
    if (result.length > 0) {
      await cartModal.update({
        goods_num: parseInt(result[0].goods_num) + parseInt(data.goods_num)
      }, {
        where: {
          cart_id: result[0].cart_id
        }
      })
    } else {
      const cart_id = Date.now().toString().substr(6, 6) + Math.random().toString().substr(2, 2)
      data["cart_id"] = cart_id
      await cartModal.create(data)
    }
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }
  /**
   * 删除商品在购物车中
   * @param {*} ctx 
   */
  static async deleteGoodsInCart(ctx) {
    const { uid, cart_id } = ctx.request.body
    await cartModal.destroy({
      where: {
        uid,
        cart_id
      }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
  }
  /**
   * 改变购物车中的状态
   * @param {*} ctx 
   */
  static async changCartstatus(ctx) {
    const { cart_id, status } = ctx.request.query
    const result = await cartModal.update({
      goods_checked: status
    }, { where: { cart_id } })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
  /**
   * 改变购物车中商品的数量
   * @param {*} ctx 
   */
  static async changCartGoodsNum(ctx) {
    const { cart_id, goods_num } = ctx.request.query
    await cartModal.update({
      goods_num
    }, { where: { cart_id } })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
   
  }
  /**
   *  清空购物车
   * @param {*} ctx 
   */
  static async deleteAllCart(ctx) {
    const { uid } = ctx.request.body
    await cartModal.destroy({
      where: { uid }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, null )
   
  }
}

module.exports = cartService