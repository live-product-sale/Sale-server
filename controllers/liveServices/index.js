const liveModal = require('../../modal/live_modal')
const { getPushUrl, getPlayUrl } = require('../../util/utils')

class liveService {
  // 创造直播室
  static async createLive(ctx) {
     const { uid, live_name } = ctx.request.body
     const live_push_url = getPushUrl(live_name)
     const live_play_url = getPlayUrl(live_name)
     const result = await liveModal.create({
       uuid: uid,
       live_name,
       live_push_url,
       live_play_url
     })
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
  //更新直播间信息
  static async reviseLive(ctx) {
    const { uid, live_name} = ctx.request.body
    const live_push_url = getPushUrl(live_name)
    const live_play_url = getPlayUrl(live_name)
    const result = await liveModal.update({
      live_name,
      live_play_url,
      live_push_url,
    }, {
      where: {
        uuid: uid
      }
    })
    if(result) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '修改成功'
      }
    } else {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '修改失败'
      }
    }
  }
  // 删除直播室
  static async deleteLive(ctx) {
    const { uid, live_name } = ctx.request.body
    const result = await liveModal.delete({
      where: {
        uuid: uid,
        live_name
      }
    })
    if(result) {
      return ctx.body = {
        code: '000000',
        data: null,
        msg: '删除成功'
      }
    } else {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '删除失败'
      }
    }
  }
  // 查询 直播室
  static async inquireLive(ctx) {

  }
  // 获取 直播室
  static async achieveLive(ctx) {
    
  }
}
module.exports = liveService