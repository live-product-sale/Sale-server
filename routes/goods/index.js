/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 12:54:45
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-12 22:29:59
 */
const router = require('koa-router')()
const goodService = require('../../controllers/goodsService')
const goodsInfoService = require('../../controllers/goodsService/goods-info')
router.prefix('/goods')
// 根据商店id 获取商品
router.get('/goodsbyshop', goodService.getGoodsByShopId)
// 添加商品
router.post('/creategoods', goodService.createGoods)
// 添加商品信息
router.post('/goodsInfo', goodsInfoService.increaseInfo)
// 获取获取商品详情
router.get('/goodsInfo', goodsInfoService.getGoodsInfo)
// 根据goods_id 获取信息
router.get('/goodsSimpleinfo', goodService.getGoodsByGoodsId)

module.exports = router