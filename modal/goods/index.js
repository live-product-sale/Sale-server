const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const goods = mysql.define('goods', {
  goods_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  goods_name: {
    type: Sequelize.STRING
  },
  goods_price: {
    type: Sequelize.STRING
  },
  goods_stock: {
    type: Sequelize.STRING
  },
  goods_avatar: {
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