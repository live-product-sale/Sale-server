const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const Bus_user = mysql.define('bus_user', {
  uuid: {
    type: Sequelize.UUID,
    PrimaryKey: true
  },
  uname: {
    type: Sequelize.STRING
  },
  uphone: {
    type: Sequelize.STRING
  },
  upassword: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false
})

Bus_user.sync({
  force: false
}).then(() => {
  console.log('Bus is successful')
})

module.exports = Bus_user