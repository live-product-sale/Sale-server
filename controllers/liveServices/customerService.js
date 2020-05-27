/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-06 19:53:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-25 21:26:52
 */
const Op = require('sequelize').Op
const live = require('../../modal/live')
const followLiveModal = require('../../modal/live/follow.live')
const buried = require('../../modal/live/buried')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')
const setTable = require('../../util/recommend/index')
const shop = require('../../modal/shop')
const goods = require('../../modal/goods')
const goodsInfo = require('../../modal/goods/goods.info')

/**
 * @param { Array } liveArray
 * @param { Array } shopArray
 * @return {Array } result
 */
class customerService {
  //推荐直播
  // 按分页查询直播间信息
  static async getLiveList(ctx) {
    const { offset, limit, uid } = ctx.request.query
    const recoData = await setTable()
    const liveSet = recoData[uid] ? recoData[uid] : []
    console.log(liveSet)
    let recommendLive = []
    const whereObj1 = { 
      live_id: { [Op.or]: liveSet }
    }
    const includeObj = [
      { 
        model: live, 
        attributes: ["live_avatar", "status", "att_amount", "view_amount", "live_id"]
      }, { 
        model: goods, 
        offset: 0, 
        limit: 1, 
        attributes: ["goods_avatar"], 
        include: [{ model: goodsInfo, attributes: ["goods_price"]}]
      }]
    if(liveSet.length !== 0) {
        recommendLive = await shop.findAll({
        offset: Number(offset),
        limit: Number(limit),
        where: whereObj1,
        attributes: [ "shop_name", "shop_avatar", "instructions"],
        include: includeObj
      })
    }
    console.log(recommendLive, "recp")
    const whereObj2 = { live_id: { [Op.not]: liveSet } }
    let otherLive = await shop.findAll({
      offset: Number(offset),
      limit: Number(limit) - recommendLive.length,
      where: whereObj2,
      attributes: [ "shop_id","shop_name", "shop_avatar", "instructions"],
      include: includeObj
    })
    console.log(otherLive, "other")
    let allLive = [...recommendLive,...otherLive]
    return ctx.body = uniformRes(resCode.SUCCESS,allLive )
  }
  
  // 根据Live_id获取直播间拉流信息
  static async getLivePlay(ctx) {
    const { live_id, uid } = ctx.request.query
    const includeObj = [ { model: shop, attributes: ["shop_name", "shop_avatar", "shop_id"]}]
    const result = await live.findOne({
      where: { live_id },
      attributes: ["live_id", "live_avatar", "live_url"],
      include: includeObj
    })
    const resultOriented = await followLiveModal.findOne({
      where: { uid, live_id }
    })
    result.dataValues['isfollow'] = resultOriented ? true : false
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  // 关注直播间 或 取消关注
  static async attentionLive(ctx) {
    const { live_id, uid, isfollow } = ctx.request.body
    const attentResult = await live.findOne({
      where: { live_id },
      attributes: ['att_amount']
    })
    const att_amount = parseInt(attentResult.att_amount)
    if (isfollow) {
      await followLiveModal.create({ uid, live_id })
      await live.update({
        att_amount: att_amount + 1
      }, {
        where: { live_id }
      })
    } else {
      await live.update({
        att_amount: att_amount === 0 ? att_amount : att_amount - 1
      }, {
        where: { live_id }
      })
      await followLiveModal.destroy({
        where: {
          uid,
          live_id
        }
      })
    }
    return ctx.body = uniformRes(resCode.SUCCESS, null)
  }
  // 获取关注的直播间
  static async getAttentionLive(ctx) {
    const { uid } = ctx.request.query
    const live_id = await followLiveModal.findAll({
      where: { uid },
      attributes: { exclude: ["uid"] }
    })
    let id = live_id.map(item => { return item.live_id })
    if (live_id.length === 0) {
      return ctx.body = uniformRes(resCode.SUCCESS, [])
    }
    const whereObj = { live_id: { [Op.or]: id}}
    const includeObj = [
      { 
        model: live, 
        attributes: ["live_avatar", "status", "att_amount", "view_amount", "live_id"]
      }, { 
        model: goods, 
        offset: 0, 
        limit: 1, 
        attributes: ["goods_avatar"], 
        include: [{ model: goodsInfo, attributes: ["goods_price"]}]
    }]
    const result = await shop.findAll({
      where: whereObj,
      include: includeObj,
      attributes: [ "shop_name", "shop_avatar", "instructions"],
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  // 按照分类ID 获取直播间
  static async getLiveByshopClass(ctx) {
    const {shop_class, goods_class} = ctx.request.query
    const whereObj1 = { shop_class }
    const whereObj2 = goods_class ? { goods_class } : null
    const includeObj = [{
      model: live,
      attributes: ["live_avatar", "status", "att_amount", "view_amount", "live_id"]
    }, {
      model: goods,
      where: whereObj2,
      attributes: ["goods_avatar"], 
      include: [{ model: goodsInfo, attributes: ["goods_price"]}]
    }]
    const result = await shop.findAll({
      where: whereObj1,
      attributes: ["shop_name", "shop_avatar", "instructions"],
      include: includeObj
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  /**
   * 
   * @param {*} ctx 
   */
  static async updateViewMount(ctx) {
    const { type, live_id } = ctx.request.body
    const result = await live.findOne({
      where: { live_id },
      attributes: ["view_amount"]
    })
    const view_amount = parseInt(result.view_amount)
    type === 'enter' ? await live.update({
      view_amount: view_amount + 1
    }, {
      where: { live_id }
    }) : ""
    type === 'out' && view_amount > 0 ? await live.update({
      view_amount: view_amount - 1
    }, {
      where: { live_id }
    }) : ""
    return ctx.body = uniformRes(resCode.SUCCESS, null)
  }
  // 进入直播间记录时间戳
  static async enterLiveWithUser(ctx) {
    const data = ctx.request.body
    const buriedObj = await buried.findOne({
      where: { uid: data.uid, live_id: data.live_id }
    })
    buriedObj? await buried.update({
      enter_time: data.enter_time
    }, { where: { uid: data.uid, live_id: data.live_id } }) : await buried.create(data)
    return ctx.body = uniformRes(resCode.SUCCESS, null)
   
  }
  // 离开直播间记录时间戳
  static async outLiveWithUser(ctx) {
    const data = ctx.request.body
    const buriedObj = await buried.findOne({
      where: { uid: data.uid, live_id: data.live_id },
      attributes: ['enter_time']
    })
    await buried.update({
      out_time: data.out_time,
      diff_time: parseInt(data.out_time) - parseInt(buriedObj.enter_time)
    }, { where: { uid: data.uid, live_id: data.live_id } })
    return ctx.body = uniformRes(resCode.SUCCESS, null)
  }
}

module.exports = customerService