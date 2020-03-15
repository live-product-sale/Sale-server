/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:29:12
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 21:30:36
 */
const rangeModal = require('../../modal/rangesort')
const sortModal = require('../../modal/rangesort/sort')
class sortService {
      // 添加直播类型
      static async addToSort(ctx) {
        const data = [
          { range_id: 0, name: "品质水果"},
          { range_id: 1, name: "新鲜蔬菜"},
          { range_id: 2, name: "粮油米面"},
          { range_id: 3, name: "水产品"},
          { range_id: 4, name: "农副加工"},
          { range_id: 5, name: "肉禽蛋品"},
          { range_id: 6, name: "苗木花草"},
          { range_id: 7, name: "其他"}
        ]
        await rangeModal.bulkCreate(data)
        return ctx.body = { code: "000000", data: null, msg: "ok"}
      }
      // 根据range_id 获取具体产品类型
      static async getSortByRange(ctx) {
        const { range_id } = ctx.request.query
        const result = await sortModal.findAll({
          where: { range_id }
        })
        result.unshift({ name: "全部"})
        return ctx.body = {
           code: "000000",
           data: result,
           msg: "ok"
        }
      }
      
}
module.exports = sortService