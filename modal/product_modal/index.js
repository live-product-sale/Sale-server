const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const product = mysql.define('product', {
  product: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.STRING
  },
  bus_id: {
    type: Sequelize.UUID
  },
  shop_id: {
    type: Sequelize.UUID
  },
  live_id: {
    type: Sequelize.UUID
  }
}, {
  freezeTableName: false
})

product.sync({
  force: false
}).then(() => {
  console.log('produce is successful')
})

module.exports = product