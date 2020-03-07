const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const goods = mysql.define('goods', {
  good_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  good_name: {
    type: Sequelize.STRING
  },
  good_stock: {
    type: Sequelize.STRING
  },
  good_price: {
    type: Sequelize.STRING
  },
  good_avatar: {
    type: Sequelize.STRING
  },
  shop_id: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false,
  timestamps: false
})

goods.sync({
  force: false
}).then(() => {
  console.log('goods is successful')
})

module.exports = goods