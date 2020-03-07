/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:54:45
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 09:31:30
 */
const router = require('koa-router')()
const goodService = require('../../controllers/goodsService')
router.prefix('/goods')
router.get('/goodsbyshop', goodService.getGoodsByShopId)



module.exports = router