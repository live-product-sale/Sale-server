/*
 * @Description: 搜索服务
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-19 12:50:53
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-28 18:37:57
 */
const rangeModal = require('../../modal/rangesort/index')
const sortModal = require('../../modal/rangesort/sort')
const liveModal = require('../../modal/live/index')
const Op = require('sequelize').Op
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class searchService {

  static async search(ctx) {
    const { key } = ctx.request.query
    const range = await rangeModal.findAll({
      where: { name: { [Op.like]: [key] } },
      attributes: ["range_id"]
    })
    const sort = await sortModal.findAll({
      where: { name: { [Op.like]: [key] } },
      attributes: ["id"]
    })
    let range_id = []
    let sort_id = []
    range.forEach(item => { range_id.push(item.range_id) })
    sort.forEach(item => { sort_id.push(item.id) })
    const result = await liveModal.findAll({
      where: {
        [Op.or]: [{ "range_id": range_id }, { "sort_id": sort_id }]
      }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result )
  }
}

module.exports = searchService