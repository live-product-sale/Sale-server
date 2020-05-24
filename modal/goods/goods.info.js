/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-07 21:08:15
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-13 15:26:38
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const goods = require('./index')

const goodsInfo = mysql.define("goodsinfo", {
  goods_price: {    // 商品价格
    type: sequelize.STRING
  },
  net_weight: {     // 商品净含量
    type: sequelize.STRING
  },
  specification: {  // 商品规格
    type: sequelize.STRING
  },
  goods_id: {       // 商品id
    type: sequelize.INTEGER
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

goods.hasMany(goodsInfo, { foreignKey: "goods_id", targetKey: "goods_id"})
goodsInfo.belongsTo(goods, { foreignKey: "goods_id", targetKey: "goods_id"})
module.exports = goodsInfo