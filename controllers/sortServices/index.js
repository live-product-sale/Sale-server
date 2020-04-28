/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:29:12
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-28 18:52:40
 */
const rangeModal = require('../../modal/rangesort')
const sortModal = require('../../modal/rangesort/sort')
const { uniformRes } = require('../../util/utils')
const { resCode, errMsg } = require('../../util/errorCode')

class sortService {
  // 添加直播类型
  static async addToSort(ctx) {
    const data = [
      { range_id: 0, name: "品质水果" },
      { range_id: 1, name: "新鲜蔬菜" },
      { range_id: 2, name: "粮油米面" },
      { range_id: 3, name: "水产品" },
      { range_id: 4, name: "农副加工" },
      { range_id: 5, name: "肉禽蛋品" },
      { range_id: 6, name: "苗木花草" },
      { range_id: 7, name: "其他" }
    ]
    await rangeModal.bulkCreate(data)
    return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
  }
  // 根据range_id 获取具体产品类型
  static async getSortByRange(ctx) {
    const { range_id } = ctx.request.query
    try {
      const result = await sortModal.findAll({
        where: { range_id }
      })
      result.unshift({ name: "全部" })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 获取直播间的类型范围
  static async getAllRange(ctx) {
    try {
      const result = await rangeModal.findAll(
        { attributes: ["name"] }
      )
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 根据range_id 获取sort
  static async getSortByRangeId(ctx) {
    const { range_id } = ctx.request.query
    try {
      const result = await sortModal.findAll({
        where: { range_id }
      })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch (err) {
      console.log(err)
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
}
module.exports = sortService