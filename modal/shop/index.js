const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')
const live = require('../live/index')

const shop = mysql.define('shop', {
  shop_id: {      // 店铺ID
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  shop_name: {    // 店铺名称
    type: Sequelize.STRING
  },
  shop_avatar: {  // 店铺头像
    type: Sequelize.STRING
  },
  address: {      // 店铺地址
    type: Sequelize.STRING
  },
  phone: {        // 联系方式
    type: Sequelize.STRING
  },
  shop_amount: {   // 店铺关注人数
    type: Sequelize.STRING
  },
  shop_class: {    // 店铺类型
    type: Sequelize.STRING
  },
  shop_sales: {    // 店铺销量
    type: Sequelize.STRING
  },
  shop_money: {    // 店铺成交额度
    type: Sequelize.INTEGER(50)
  },
  shop_view: {     // 店铺访问量
    type: Sequelize.STRING
  },
  business_hour: {  // 营业时间
    type: Sequelize.STRING
  },
  instructions: {  // 购买须知
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  live_id: {      // 直播间ID
    type: Sequelize.INTEGER(11)
  }
}, {
  timestamps: false,
  tableName: 'shops'
})
shop.sync({
  force: false
}).then(() => {
  console.log('shop is successful')
})

module.exports = shop