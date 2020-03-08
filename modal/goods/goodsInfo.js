/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:08:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-07 21:52:33
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const goodsInfo = mysql.define("goodsinfo", {
  net_weight: {
    type: sequelize.STRING
  },
  specification: {
    type: sequelize.STRING
  },
  goods_id: {
    type: sequelize.STRING
  }
}, {
  freezeTableName: false,
  timestamps: false
})
goodsInfo.sync({
  force: false
}).then(() => {
  console.log('goodsInfo is successful')
})
module.exports = goodsInfo