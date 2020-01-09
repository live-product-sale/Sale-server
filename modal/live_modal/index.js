const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const live = mysql.define('live', {
  live_name: {
    type: Sequelize.STRING   //直播间名
  },
  live_push_url: {
    type: Sequelize.STRING  // 直播视频推流地址
  },
  live_play_url: {
    type: Sequelize.STRING  // 直播间播放地址
  },
  live_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false   // 主播的状态，false不在线， true 在线
  },
  shop_id: {
    type: Sequelize.UUID  // 店铺 的ID
  },
  uuid: {
    type: Sequelize.UUID  // 用户 id 
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