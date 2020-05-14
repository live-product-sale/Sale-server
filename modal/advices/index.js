/*
 * @Description: 意见反馈表
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-14 13:50:36
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-14 13:53:49
 */
const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const advice = mysql.define('advice', {
  uid: {          // 用户ID
    type: Sequelize.STRING
  },
  type: {         // 反馈意见类型 0 功能意见， 1 其他意见
    type: Sequelize.STRING
  },
  content: {      // 用户手机
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})
advice.sync({
  force: false
}).then(() => {
  console.log('advices is successful')
})

module.exports = advice