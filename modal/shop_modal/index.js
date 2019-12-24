const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const shop = mysql.define('shop', {
  shop_id: {
    type: Sequelize.UUID,
    PrimaryKey: true
  },
  shop_name: {
    type: Sequelize.STRING
  },
  bus_id: {
    type: Sequelize.UUID
  },
  bus_name: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false
})

shop.sync({
  force: false
}).then(() => {
  console.log('shop is successful')
})

module.exports = shop