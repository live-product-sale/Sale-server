const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')
const shop = require('../shop/index')

const live = mysql.define('live', {
  live_id: { // 直播间id
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  live_avatar: {  // 直播间的图片地址， 就是一进去直播间展示的图片
    type: Sequelize.STRING
  },
  live_name: {    // 直播标题
    type: Sequelize.STRING
  },
  live_detail: {  // 直播简介
    type: Sequelize.STRING
  },
  live_url: {     // 直播地址
    type: Sequelize.STRING
  },
  status: {       // 直播状态， 默认为 false ,表示主播不在线
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  att_amount: {    // 关注人数
    type: Sequelize.STRING,
    defaultValue: '0'
  },
  view_amount: {  // 观看人数
    type: Sequelize.STRING,
    defaultValue: '0'
  },
  shop_id: {       // 店铺
    type: Sequelize.INTEGER(11)
  },
  uid: {           // 直播用户ID
    type: Sequelize.INTEGER(11)
  }
}, {
  timestamps: false,
  tableName: 'lives'
});

live.sync({
  force: false
}).then(() => {
  console.log('live is successful')
})
shop.belongsTo(live, { foreignKey: "live_id", targetKey: "live_id"})
live.hasOne(shop, { foreignKey: "live_id", targetKey: "live_id"})
module.exports = live