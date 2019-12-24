const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const Cus_user = mysql.define('cus_user', {
  uuid: {
    type: Sequelize.UUID,
    PrimaryKey: true
  },
  cname: {
    type: Sequelize.STRING
  },
  cphone: {
    type: Sequelize.STRING
  },
  cpassword: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false
});

Cus_user.sync({
  force: false
}).then(() => {
  console.log('cus_user is successful')
})

module.exports = Cus_user