/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:31:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 17:51:11
 */
const router = require('koa-router')()
const shopService = require('../../controllers/shopService')
router.prefix("/shop")

// 创建商店
router.post('/create', shopService.createShop)
// 获取商店列表
router.get('/list', shopService.getShopInfo)
// 获取商店详情
router.get('/shopInfo', shopService.getShopByShopId)
module.exports = router