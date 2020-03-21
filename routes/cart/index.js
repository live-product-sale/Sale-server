/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:41:32
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-21 09:09:16
 */
const router = require('koa-router')()
const cartService = require('../../controllers/cartService')
router.prefix('/cart')
// 获取购物车信息
router.get('/cartList', cartService.getCart)
// 添加购物车
router.post('/increase', cartService.increaseCart)
// 删除购物车
router.post('/delete', cartService.deleteGoodsInCart)
// 改变购物车中商品的状态
router.get('/status', cartService.changCartstatus)
// 改变购物车中某商品的数量
router.get('/goods_num', cartService.changCartGoodsNum)
// 清空购物车中的产品
router.post('/deleteAll', cartService.deleteAllCart)

module.exports = router