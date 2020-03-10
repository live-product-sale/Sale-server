/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-06 19:53:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-09 15:02:45
 */
const liveModal = require('../../modal/live')

class customerService {
  // 按分页查询直播间信息
   static async getLiveList(ctx) {
     const { offset, limit } = ctx.request.query
     const result = await liveModal.findAll({
        offset: parseInt(offset), 
        limit: parseInt(limit),
        attributes: { exclude: ['live_push', 'live_play']}
      })
     return ctx.body = {
       code: "000000",
       data: result,
       msg: "ok"
     }
   }
   // 根据Live_id获取直播间拉流信息
   static async getLivePlay(ctx) {
     const { live_id } = ctx.request.query
     console.log(live_id)
     const result = await liveModal.findOne({
       where: { live_id },
       attributes: { exclude: ['live_push', 'shop_slogan', 'good_price', 'good_avatar', 'status', 'sort_id']}
     })
     return ctx.body = {
       code: "000000",
       data: result,
       msg: "ok"
     }
   }
}

module.exports = customerService