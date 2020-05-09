const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')
const live = require('../live')

const shop = mysql.define('shop', {
  shop_id: {      // 店铺ID
    type: Sequelize.STRING,
    PrimaryKey: true
  },
  shop_name: {    // 店铺名称
    type: Sequelize.STRING
  },
  shop_avatar: {  // 店铺头像
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  shop_amount: {
    type: Sequelize.STRING
  },
  business_hour: {
    type: Sequelize.STRING
  },
  instructions: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  live_id: {      // 直播间ID
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false,
  timestamps: false
})
// shop.belongsTo(live)
shop.sync({
  force: false
}).then(() => {
  console.log('shop is successful')
})

module.exports = shop