/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-06 19:53:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-26 16:36:55
 */
const Op = require('sequelize').Op
const liveModal = require('../../modal/live')
const followLive = require('../../modal/live/followLive')
const buried = require('../../modal/live/buried')
const { ResFormat } = require('../../util/utils')
const { errMsg, resCode } = require('../../util/errorCode')
const setTable = require('../../util/recommend/index')

class customerService {
  //推荐直播

  // 按分页查询直播间信息
  static async getLiveList(ctx) {
    const { offset, limit, live_id } = ctx.request.query
    try {
      const recoData = await setTable()
      const liveSet = recoData[live_id] ? recoData[live_id] : []
      const recommendLive = await liveModal.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        attributes: { exclude: ['live_push', 'live_play'] }
      }, {
        where: {
          live_id: liveSet
        }
      })
      const result = await liveModal.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        attributes: { exclude: ['live_push', 'live_play'] }
      }, {
        where: {
          live_id: {
            [Op.not]: liveSet
          }
        }
      })
      return ctx.body = ResFormat(resCode.SUCCESS, [...recommendLive, ...result], errMsg[resCode.SUCCESS])
    } catch (err) {
      console.error(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 根据Live_id获取直播间拉流信息
  static async getLivePlay(ctx) {
    const { live_id } = ctx.request.query
    try {
      const result = await liveModal.findOne({
        where: { live_id },
        attributes: { exclude: ['live_push', 'shop_slogan', 'good_price', 'good_avatar', 'status', 'sort_id'] }
      })
      return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.error(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 关注直播间 或取消关注
  static async attentionLive(ctx) {
    const { live_id, isfollow, uid } = ctx.request.body
    try {
      const result = await liveModal.update({
        isfollow
      }, {
        where: { live_id }
      })
      if (isfollow) {
        await followLive.create({ uid, live_id })
      } else {
        await followLive.destroy({
          where: {
            uid,
            live_id
          }
        })
      }
      return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.error(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 获取关注的直播间
  static async getAttentionLive(ctx) {
    const { uid } = ctx.request.query
    try {
      const live_id = await followLive.findAll({
        where: { uid },
        attributes: { exclude: ["uid", "id"] }
      })
      let id = live_id.map(item => { return item.live_id })
      if (live_id.length === 0) {
        return ctx.body = ResFormat(resCode.SUCCESS, [], errMsg[resCode.EMPTY])
      }
      const result = await liveModal.findAll({
        where: {
          live_id: {
            [Op.or]: id
          }
        }
      })
      return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.error(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 按照分类ID 获取直播间
  static async getLiveBySort(ctx) {
    const data = ctx.request.query
    try {
      const result = await liveModal.findAll({
        where: { ...data },
        attributes: { exclude: ["live_push"] }
      })
      return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.error(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 进入直播间记录时间戳
  static async enterLiveWithUser(ctx) {
    const data = ctx.request.body
    try {
      const buriedObj = await buried.findAll({
        where: { uid: data.uid, live_id: data.live_id },
        attributes: ['id']
      })
      console.log(buriedObj)
      buriedObj.length > 0 ? await buried.update({
        enter_time: data.enter_time
      }, { where: { id: buriedObj.id } }) : await buried.create(data)
      return ctx.body = ResFormat(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 离开直播间记录时间戳
  static async outLiveWithUser(ctx) {
    const data = ctx.request.body
    try {
      const buriedObj = await buried.findOne({
        where: { uid: data.uid, live_id: data.live_id },
        attributes: ['enter_time']
      })
      await buried.update({
        out_time: data.out_time,
        diff_time: parseInt(data.out_time) - parseInt(buriedObj.enter_time)
      }, { where: { uid: data.uid, live_id: data.live_id } })
      return ctx.body = ResFormat(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = ResFormat(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
}

module.exports = customerService