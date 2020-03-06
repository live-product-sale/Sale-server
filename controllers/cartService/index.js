/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:40:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-04 19:36:21
 */
const cartModal = require('../../modal/cart')
class cartService {
  static async getCart(ctx) {
    const { uid } = ctx.request.query
    const result = await cartModal.findAll({
      where: {
        uid
      }
    })
    console.log(result)
    return ctx.body = {
      code: "000000",
      data: result,
      msg: 'OK'
    }
  }
}

module.exports = cartService