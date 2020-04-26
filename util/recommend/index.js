/*
 * @Description: 推荐
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-04-26 14:03:57
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-26 16:26:02
 */
const jsrecommender = require("js-recommender");
var recommender = new jsrecommender.Recommender({
  alpha: 0.01,
  lambda: 0.0,
  iterations: 500,
  kDim: 2
});
const buriedModal = require('../../modal/live/buried')
/**
 * 获取数据
 */
async function getSetData() {
  let result;
  try {
    result = await buriedModal.findAll({
      attributes: ["uid", "live_id", "diff_time"]
    })
  } catch (err) {
    result = []
  }
  return result
}
/**
 * item : { live_id, uid, diff_time }
 * @param {item[]} data 
 */
async function setTable() {
  let result = {}
  const table = new jsrecommender.Table()
  try {
    let data = await getSetData()
    data.forEach(item => {
      table.setCell(item.live_id, item.uid, item.diff_time)
    });
    var model = recommender.fit(table);
    predicted_table = recommender.transform(table);
    for (var i = 0; i < predicted_table.columnNames.length; ++i) {
      var uid = predicted_table.columnNames[i];
      result[uid] = []
      for (var j = 0; j < predicted_table.rowNames.length; ++j) {
        var live_id = predicted_table.rowNames[j];
        result[uid].push(live_id)
      }
    }
    return result
  } catch (err) {
    return {}
  }
}
module.exports = setTable
// setTable().then(res => {
//   console.log('res',res)
// }) 

