/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:08:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:11:58
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const goodsInfo = mysql.define("goodsinfo", {
  net_weight: {     // 商品净含量
    type: sequelize.STRING
  },
  specification: {  // 商品规格
    type: sequelize.STRING
  },
  goods_id: {       // 商品id
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