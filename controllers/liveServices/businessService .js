const liveModal = require('../../modal/live/index')
const { 
  getPushUrl, 
  getPlayUrl, 
  generateId 
} = require('../../util/utils')

class busService {
  // 创造直播室
  static async createLive(ctx) {
     const { shop_id, poster } = ctx.request.body
     const live_id = Date.now().toString().substr(8,5)+Math.random().toString().substr(8,5)
     const live_push = getPushUrl(live_id)
     const live_play = getPlayUrl(live_id)
     const result = await liveModal.create({
       live_id,
       live_poster: poster,
       shop_id,
       live_push,
       live_play
     })
     console.log(live_push, live_play )
     return ctx.body = {
       code: '000000',
       data: {...result.dataValues, live_play: undefined},
       msg: 'ok'
     }
  }
  // 根据商店Id获取直播间
  static async getLiveByShopId(ctx) {
   const { shop_id } = ctx.request.query
   const result = await liveModal.findAll({
     where: { shop_id },
     attributes: { exclude: ['live_play']}
   })
   return ctx.body = {
     code: "000000",
     msg: "ok",
     data: result
   }
  }
  // 根据ID获取信息推流地址
  static async getLiveById(ctx) {
    const { live_id } = ctx.request.query
    const result = await liveModal.findOne({
      where : { live_id }
    })
    return ctx.body = {
      code: '000000', 
      data: { live_push: result.live_push },
      msg: 'ok'
    }
  }
  // 开始或结束直播
  static async startOrEndLive(ctx) {
    const { live_id, status } = ctx.request.query
    const result = await liveModal.update(
      { status },
      { where: { live_id }
    })
    return ctx.body = {
      code: "000000",
      data: result,
      msg: "ok"
    }
  }
}
module.exports = busService