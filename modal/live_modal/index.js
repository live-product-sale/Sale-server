const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const live = mysql.define('live', {
  live_name: {
    type: Sequelize.STRING
  },
  streamName: {
    type: Sequelize.STRING
  },
  live_push_url: {
    type: Sequelize.STRING
  },
  live_play_url: {
    type: Sequelize.STRING
  },
  shop_id: {
    type: Sequelize.UUID
  }
}, {
  freezeTableName: false
})

live.sync({
  force: false
}).then(() => {
  console.log('live is successful')
})

module.exports = live