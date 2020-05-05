const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const goods = mysql.define('goods', {
  goods_id: {       // 商品ID
    type: Sequelize.STRING,
    primaryKey: true
  },
  goods_name: {     // 商品名称
    type: Sequelize.STRING
  },
  goods_price: {    // 商品价格
    type: Sequelize.STRING
  },
  goods_stock: {    // 商品库存
    type: Sequelize.STRING
  },
  goods_avatar: {   // 商品图片
    type: Sequelize.STRING
  },
  goods_state:{     // 商品状态
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