const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const live = mysql.define('live', {
  live_id: { // 直播间id
    type: Sequelize.STRING,
    primaryKey: true
  },
  live_poster: {  // 直播间的图片地址， 就是一进去直播间展示的图片
    type: Sequelize.STRING
  },
  live_play: {    // 直播拉流地址
    type: Sequelize.STRING
  },
  live_push: {    // 直播推流地址
    type: Sequelize.STRING
  },
  status: {       // 直播状态， 默认为 false ,表示主播不在线
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shop_avatar: {  // 店铺图片
    type: Sequelize.STRING
  },
  shop_name: {   // 店铺名称
    type: Sequelize.STRING
  },
  shop_slogan: {  // 店铺的标语
    type: Sequelize.STRING
  },
  goods_price: {  // 商品价格
    type: Sequelize.STRING
  },
  goods_avatar: {  // 商品图片地址
    type: Sequelize.STRING
  },
  shop_id: {       // 店铺id
    type: Sequelize.STRING
  },
  range_id: {      // 直播间范围id， 主要分为8类， id范围 0-7
    type: Sequelize.STRING
  },
  sort_id: {       // 直播产品类ID
    type: Sequelize.STRING
  },
  att_amount: {    // 关注人数
    type: Sequelize.STRING,
    defaultValue: '0'
  },
  view_amount: {  // 观看人数
    type: Sequelize.STRING,
    defaultValue: '0'
  },
}, {
  freezeTableName: false,
  timestamps: false
})

live.sync({
  force: false
}).then(() => {
  console.log('live is successful')
})
module.exports = live