/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:54:45
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 22:18:16
 */
const router = require('koa-router')()
const goodService = require('../../controllers/goodsService')
const goodsInfoService = require('../../controllers/goodsService/goods-info')
router.prefix('/goods')
router.get('/goodsbyshop', goodService.getGoodsByShopId)
router.post('/creategoods', goodService.createGoods)
router.post('/goodsInfo', goodsInfoService.increaseInfo)
router.get('/goodsInfo', goodsInfoService.getGoodsInfo)



module.exports = router