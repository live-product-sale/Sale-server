/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:41:32
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-08 19:16:00
 */
const router = require('koa-router')()
const cartService = require('../../controllers/cartService')
router.prefix('/cart')
router.get('/cartList', cartService.getCart)
router.post('/increase', cartService.increaseCart)
router.post('/delete', cartService.deleteGoodsInCart)

module.exports = router