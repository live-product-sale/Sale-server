/*
 * @Description: 错误码处理
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-04-06 17:36:39
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-06 18:01:06
 */
//错误码
const resCode = {
  SUCCESS:       "000000",
  ERROR:         "000001",
  LACK:          "000002",
  EMPTY:         "000003",
  UNLOGIN:       "000004",
  EXIST:         "000005",
  PARAMETER_ERR: "000006"
}
// 错误信息
const errMsg = {
  [resCode.SUCCESS]:       '请求成功',
  [resCode.ERROR]:         '服务端错误',
  [resCode.LACK]:          '缺少参数',
  [resCode.EMPTY]:         '找不到对应信息',
  [resCode.UNLOGIN]:       '用户未登陆',
  [resCode.EXIST]:         '数据已存在',
  [resCode.PARAMETER_ERR]: '参数错误'
}
module.exports = {
  errMsg,
  resCode
}