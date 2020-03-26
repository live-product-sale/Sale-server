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
  goods_state:{
    type: Sequelize.STRING,
    defaultValues: "1"       // 1:未发布 ，2:已发布， 3: 已下架
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