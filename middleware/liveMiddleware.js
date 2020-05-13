/*
 * @Description: 直播间中间件
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-12 18:00:39
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-13 09:37:38
 */
const shopModal = require('../modal/shop')
const goodsModal = require('../modal/goods/index')
const goodsInfo = require('../modal/goods/goodsInfo')
const Op = require('sequelize').Op
const { uniformRes } = require('../util/utils')
const { resCode } = require('../util/errorCode')

/**
 * @param { Array } liveArray
 * @param { Array } shopArray
 * @return {Array } result
 */
const mergeArray = (Array1, Array2) => {
  // for(var i = 0; i< Array1.length ; i++) {
  //   for(var j = 0; j< Array2.length; j++) {
  //     if(Array1[i].shop_id === Array2[j].shop_id) {
  //       Array1[i].dataValues = { ...Array1[i].dataValues, ...Array2[j].dataValues}
  //     }
  //   }
  // }
  return Array1
}
const mergeGoods = (Array1, Array2) => {
  // for(var i = 0; i< Array1.length ; i++) {
  //   for(var j = 0; j< Array2.length; j++) {
  //     if(Array1[i].goods_id == Array2[j].goods_id) {
  //       Array1[i].dataValues = { ...Array1[i].dataValues, ...Array2[j].dataValues}
  //     }
  //   }
  // }
  return Array1
}

const getShopData = async (ctx, next) => {
  const shopData = await shopModal.findAll({
    attributes: ["shop_name", "shop_avatar", "shop_id", "instructions"]
  })
  const shopId = [] 
  shopData.forEach(item => shopId.push(item.shop_id))
  ctx.request.shopInfo = JSON.stringify(shopData)
  ctx.request.shopId = shopId
  await next()
}
const goodsData = async (ctx, next) => {
  const result = ctx.body.data
  const shopId = ctx.request.shopId
  const goodsData = await goodsModal.findAll({
    where: {
      shop_id: {
        [Op.or]: shopId
      }
    },
    attributes: ["shop_id", "goods_id", "goods_avatar"]
  })
  const goodsId = []
  goodsData.forEach(item => goodsId.push(item.goods_id))
  const goodsPrice = await goodsInfo.findAll({
    where: { 
      goods_id: {
        [Op.or]: goodsId
      }
    },
    attributes: ['goods_price', "goods_id"]
  })
  // console.log(goodsPrice)
  // const res2 = mergeGoods(goodsData, goodsPrice)
  let res = mergeArray(result, mergeGoods(goodsData, goodsPrice))
  return ctx.body = uniformRes(resCode.SUCCESS, res)
}
module.exports = {
  getShopData,
  goodsData
}
