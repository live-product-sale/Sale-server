const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')
const live = require('../live')

const shop = mysql.define('shop', {
  shop_id: {
    type: Sequelize.STRING,
    PrimaryKey: true
  },
  shop_name: {
    type: Sequelize.STRING
  },
  shop_avatar: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  live_id: {
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