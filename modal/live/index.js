const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const live = mysql.define('live', {
  live_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  live_poster: {
    type: Sequelize.STRING
  },
  live_play: {
    type: Sequelize.STRING
  },
  live_push: {
    type: Sequelize.STRING
  },
 
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shop_avatar: {
    type: Sequelize.STRING
  },
  shop_name: {
    type: Sequelize.STRING
  },
  shop_slogan: {
    type: Sequelize.STRING
  },
  goods_price: {
    type: Sequelize.STRING
  },
  goods_avatar: {
    type: Sequelize.STRING
  },
  shop_id: {
    type: Sequelize.STRING
  },
  range_id: {
    type: Sequelize.STRING
  },
  sort_id: {
    type: Sequelize.STRING
  },
  att_amount: {
    type: Sequelize.STRING,
    defaultValue: '0'
  },
  view_amount: {
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