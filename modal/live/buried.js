const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const buried = mysql.define('burried', {
  // 对用户观看直播的时间统计
  uid: {     //用户ID
    type: Sequelize.STRING
  },
  live_id: { // 直播ID 
    type: Sequelize.STRING
  },
  enter_time:{ // 进入直播间 时间戳
    type: Sequelize.STRING
  },
  out_time: {  // 离开直播间 时间戳
    type: Sequelize.STRING
  },
  diff_time: { // 时间差 离开时间 - 进入时间
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false,
  timestamps: false
})

buried.sync({
  force: false
}).then(res => {
  console.log('buried is successful')
})
module.exports = buried