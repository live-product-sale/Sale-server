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
  isfollow: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
  good_price: {
    type: Sequelize.STRING
  },
  good_avatar: {
    type: Sequelize.STRING
  },
  shop_id: {
    type: Sequelize.STRING
  },
  sort_id: {
    type: Sequelize.STRING
  }
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