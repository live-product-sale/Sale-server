/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 11:31:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-29 21:27:49
 */
const router = require('koa-router')()
const shopService = require('../../controllers/shopService')
const shopMiddleare = require('../../middleware/shop.middlare')
router.prefix("/shop")

// 获取商店列表
router.get('/list', shopService.getShopInfo)
// 获取商店详情
router.get('/shopInfo', shopService.getShopByShopId)
// 根据shopClass 获取商品类型
router.get('/goodsclass', shopService.getGoodsClass)
// 关注商店
router.post('/heart',  shopMiddleare.AttrShop, shopMiddleare.getShopAmount, shopService.heartShop)
// 跟新店铺访问量
router.post('/updateViews', shopMiddleare.getShopViews, shopService.updateViews)
// 获取商店是否被某用户关注
router.post('/isheart', shopService.getIsHeart)
module.exports = router