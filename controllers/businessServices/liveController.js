const liveModal = require('../../modal/live_modal')
const { createUID, createToken, getPlayUrl, getPushUrl } = require('../../util/utils')

class liveController {
  // 添加直播间
  static async addTolive(ctx) {
    let live = ctx.request.body
    live['streamName'] = encodeURI(live.live_name)
    const time = new Date().getTime() / 1000
    live['live_push_url'] = getPushUrl(live['streamName'], time)
    live['live_play_url'] = getPlayUrl(live['streamName'], time)
    const result = await liveModal.create(live)
    if(result) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '创建成功'
      }
    } else {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '创建失败'
      }
    }
  }
  // 根据店铺ID获取直播间
  static async getAllLive(ctx) {
    const shop_id = ctx.request.query
    const result = await liveModal.findAll({
      where: shop_id
    })
    if(result) {
      return ctx.body = {
        code: '000000',
        data: result,
        msg: '查找成功'
      }
    } else {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '查找失败'
      }
    }
  }
}

module.exports = liveController
