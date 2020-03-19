/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-06 19:53:21
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 22:47:51
 */
const liveModal = require('../../modal/live')
const followLive = require('../../modal/live/followLive')
const Op = require('sequelize').Op
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
   // 关注直播间 或取消关注
   static async attentionLive(ctx) {
     const { live_id, isfollow , uid} = ctx.request.body
     const result = await liveModal.update({
       isfollow
     }, {
       where: { live_id }
     })
     if(isfollow) {
       await followLive.create({ uid, live_id})
     } else {
       await followLive.destroy({
         where: {
           uid,
           live_id
         }
       })
     }

     return ctx.body = {
       code: "000000",
       data: result,
       msg: "OK"
     }
   }
   static async getAttentionLive(ctx) {
     const { uid } = ctx.request.query
     const live_id = await followLive.findAll({
       where: { uid },
       attributes: { exclude: ["uid", "id"]}
     })
     let id = live_id.map(item => { return item.live_id})
     if(live_id.length === 0) {
       return ctx.body = {
         code: "000000",
         data: [],
         msg: "关注为空"
       }
     }
     const result = await liveModal.findAll({
       where: {
         live_id: {
           [Op.or]: id
         }
       }
     })
     return ctx.body = {
       code: "000000",
       data: result,
       msg: "ok"
     }
   }
   static async getLiveBySort(ctx) {
     const data = ctx.request.query
     const result = await liveModal.findAll({
           where: {...data}, 
           attributes: { exclude: ["live_push"]}
        })
       return ctx.body = {
        code: "000000",
        data: result,
        msg: "ok"
      }    
   }
}

module.exports = customerService