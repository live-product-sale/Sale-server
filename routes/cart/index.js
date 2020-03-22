/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:41:32
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-18 20:53:31
 */
const router = require('koa-router')()
const cartService = require('../../controllers/cartService')
router.prefix('/cart')
// 获取购物车数据
router.get('/cartList', cartService.getCart)
// 往购物车添加数据
router.post('/increase', cartService.increaseCart)
// 删除购物车中的数据
router.post('/delete', cartService.deleteGoodsInCart)
// 改变购物车中的状态
router.get('/status', cartService.changCartstatus)
// 改变购物车中的某商品的数量
router.get('/goods_num', cartService.changCartGoodsNum)
// 清空购物车
router.post('/deleteAll', cartService.deleteAllCart)

module.exports = router