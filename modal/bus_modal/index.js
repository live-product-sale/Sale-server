const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const Bus_user = mysql.define('bus_user', {
  uid: {
    type: Sequelize.STRING,
    PrimaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  password: {
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