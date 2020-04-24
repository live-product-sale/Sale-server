const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const buried = mysql.define('burried', {
  uid: {
    type: Sequelize.STRING
  },
  live_id: {
    type: Sequelize.STRING
  },
  range_id: {
    type: Sequelize.STRING
  },
  enter_time:{
    type: Sequelize.STRING
  },
  out_time: {
    type: Sequelize.STRING
  },
  diff_time: {
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