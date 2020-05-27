const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const shop = require('../shop/index')

const goods = mysql.define('goods', {
  goods_id: {       // 商品ID
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  goods_name: {     // 商品名称
    type: Sequelize.STRING
  },
  goods_avatar: {   // 商品图片
    type: Sequelize.STRING
  },
  goods_class: {    // 商品类型
    type: Sequelize.STRING
  },
  goods_state: {     // 商品状态
    type: Sequelize.STRING,
    defaultValues: "1"       // 1:未发布 ，2:已发布， 3: 已下架
  },
  goods_stock: {    // 商品库存
    type: Sequelize.STRING
  },
  goods_sales: {    // 商品销量
    type: Sequelize.STRING
  },
  goods_views: {    // 商品浏览量
    type: Sequelize.STRING
  },
  shop_id: {        // 店铺ID
    type: Sequelize.INTEGER(11)
  }
}, {
  timestamps: false,
  tableName: 'goods'
})
goods.sync({
  force: false
}).then(() => {
  console.log('goods is successful')
})
shop.hasMany(goods, { foreignKey: "shop_id", targetKey: "shop_id"})
goods.belongsTo(shop, { foreignKey: "shop_id", targetKey: "shop_id"})
module.exports = goods