const liveModal = require('../../modal/live/index')
const sortModal = require('../../modal/rangesort/sort')
const Op = require('sequelize').Op
const {
  getPushUrl,
  getPlayUrl,
  generateId
} = require('../../util/utils')
const { resCode, errMsg } = require('../../util/errorCode')
const { ResFormat } = require('../../util/utils')

/**
 * 适配器直播间参数
 * @param {Object} data 
 * @returns liveObj
 */
const adapterArg = async (data) => {
  let liveObj = {}
  liveObj["live_id"] = Date.now().toString().substr(8, 5) + Math.random().toString().substr(8, 5)
  liveObj["live_push"] = getPushUrl(liveObj["live_id"])
  liveObj["live_play"] = getPlayUrl(liveObj["live_id"])
  for (var item in data) {
    liveObj[item] = data[item]
  }
  // console.log(data)
  const sort_name = data.sort_name
  const sort = await sortModal.findOne({
    where: { name: sort_name, range_id: data.range_id },
    attributes: ["id"]
  })
  // console.log(sort)
  liveObj["sort_id"] = sort.id
  return liveObj
}

class busService {
  // 创造直播室
  static async createLive(ctx) {
    const data = ctx.request.body
    const liveObj = await adapterArg(data)
    const result = await liveModal.create(liveObj)
    const content = { ...result.dataValues, live_play: undefined }
    return ctx.body = ResFormat(resCode.SUCCESS, content, errMsg[resCode.SUCCESS])
  }
  // 根据商店Id获取直播间
  static async getLiveByShopId(ctx) {
    const { shop_id } = ctx.request.query
    const result = await liveModal.findAll({
      where: { shop_id },
      attributes: { exclude: ['live_play'] }
    })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
  // 根据ID获取信息推流地址
  static async getLiveById(ctx) {
    const { live_id } = ctx.request.query
    const result = await liveModal.findOne({
      where: { live_id }
    })
    const data = { live_push: result.live_push }
    return ctx.body = ResFormat(resCode.SUCCESS, data, errMsg[resCode.SUCCESS])
  }
  // 开始直播
  static async startLive(ctx) {
    const { live_id, status } = ctx.request.query
    const live_push = getPushUrl(live_id)
    const live_play = getPlayUrl(live_id)
    const result = await liveModal.update(
      { status, live_play, live_push },
      {
        where: { live_id }
      })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
  // 结束直播
  static async endLive(ctx) {
    const { live_id, status } = ctx.request.query
    const result = await liveModal.update({
      status
    }, { where: { live_id } })
    return ctx.body = ResFormat(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
  }
}
module.exports = busService