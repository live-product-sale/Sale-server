/*
 * @Description: 搜索服务
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-19 12:50:53
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-13 22:40:38
 */
// const rangeModal = require('../../modal/rangesort/index')
// const sortModal = require('../../modal/rangesort/sort')
const live = require('../../modal/live/index')
const shop = require('../../modal/shop')
const goods = require('../../modal/goods/index')
const goodsInfo = require('../../modal/goods/goodsInfo')
const Op = require('sequelize').Op
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class searchService {

  static async search(ctx) {
    const { key } = ctx.request.query
    console.log(key)
    const whereObj = { goods_class: { [Op.like]: [key]}}
    const whereObj1 = { shop_class: { [Op.like]: [key]}}
    const includeObj = [{
      model: live,
      attributes: ["live_avatar", "status", "att_amount", "view_amount", "live_id"]
    }, {
      model: goods,
      where: whereObj,
      attributes: ["goods_avatar"], 
      include: [{ model: goodsInfo, attributes: ["goods_price"]}]
    }]
    const result1 = await shop.findAll({
      attributes: ["shop_name", "shop_avatar", "instructions"],
      include: includeObj
    })
    const includeObj1 = [{
      model: live,
      attributes: ["live_avatar", "status", "att_amount", "view_amount", "live_id"]
    }, {
      model: goods,
      attributes: ["goods_avatar"], 
      include: [{ model: goodsInfo, attributes: ["goods_price"]}]
    }]
    const result2 = await shop.findAll({
      where: whereObj1,
      attributes: ["shop_name", "shop_avatar", "instructions"],
      include: includeObj1
    })
    return ctx.body = uniformRes(resCode.SUCCESS, {...result1 , ...result2})
  }
}

module.exports = searchService