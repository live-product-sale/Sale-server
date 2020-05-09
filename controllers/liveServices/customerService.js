/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-06 19:53:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-01 15:24:41
 */
const Op = require('sequelize').Op
const liveModal = require('../../modal/live')
const followLiveModal = require('../../modal/live/followLive')
const buried = require('../../modal/live/buried')
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')
const setTable = require('../../util/recommend/index')

class customerService {
  //推荐直播

  // 按分页查询直播间信息
  static async getLiveList(ctx) {
    const { offset, limit, uid } = ctx.request.query
    const recoData = await setTable()
    const liveSet = recoData[uid] ? recoData[uid] : []
    console.log(liveSet)
    let recommendLive = []
    if(liveSet.length !== 0) {
        recommendLive = await liveModal.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        attributes: { exclude: ['live_push', 'live_play'] },
        where: {
          live_id: {
            [Op.or]: liveSet
          }
        }
      })
    }
    const otherLive = await liveModal.findAll({
      offset: parseInt(offset),
      limit: parseInt(limit) - recommendLive.length,
      where: {
        live_id: {
          [Op.not]: liveSet
        }
      }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, [...recommendLive, ...otherLive])
  }
  // 根据Live_id获取直播间拉流信息
  static async getLivePlay(ctx) {
    const { live_id, uid } = ctx.request.query
    const result = await liveModal.findOne({
      where: { live_id },
      attributes: {
        exclude: ['live_push', 'shop_slogan', 'good_price', 'good_avatar', 'status', 'sort_id']
      }
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
    const attentResult = await liveModal.findOne({
      where: { live_id },
      attributes: ['att_amount']
    })
    const att_amount = parseInt(attentResult.att_amount)
    if (isfollow) {
      await followLiveModal.create({ uid, live_id })
      await liveModal.update({
        att_amount: att_amount + 1
      }, {
        where: { live_id }
      })
    } else {
      await liveModal.update({
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
      attributes: { exclude: ["uid", ] }
    })
    let id = live_id.map(item => { return item.live_id })
    if (live_id.length === 0) {
      return ctx.body = uniformRes(resCode.SUCCESS, [])
    }
    const result = await liveModal.findAll({
      where: {
        live_id: {
          [Op.or]: id
        }
      }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  // 按照分类ID 获取直播间
  static async getLiveBySort(ctx) {
    const data = ctx.request.query
    const result = await liveModal.findAll({
      where: { ...data },
      attributes: { exclude: ["live_push"] }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
  /**
   * 
   * @param {*} ctx 
   */
  static async updateViewMount(ctx) {
    const { type, live_id } = ctx.request.body
    const result = await liveModal.findOne({
      where: { live_id },
      attributes: ["view_amount"]
    })
    const view_amount = parseInt(result.view_amount)
    type === 'enter' ? await liveModal.update({
      view_amount: view_amount + 1
    }, {
      where: { live_id }
    }) : ""
    type === 'out' && view_amount > 0 ? await liveModal.update({
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