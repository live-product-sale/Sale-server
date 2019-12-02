const mysql = require('../mysql/index')
const Sequelize = require('sequelize')

const Users = mysql.define('user', {
  user_id: {
    type: Sequelize.STRING
  },
  user_name: {                      // 创建表字段
    type: Sequelize.STRING,        //定义字段类型
    field: 'user_name'         //指定存储在表中的健名
  },
  user_password: {
    type: Sequelize.STRING,
  },
  user_phone: {
    type: Sequelize.STRING,
  },
  user_email: {
    type: Sequelize.STRING
  },
  user_isbusiness: {
    type: Sequelize.BOOLEAN
  },
  user_iscustomer: {
    type: Sequelize.BOOLEAN
  }
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL 创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: false
});

// 创建表
// User.sync() 会创建表并且返回一个 Promise 对象
// 如果 force = true 则会把存在的表（如果 users 表已存在）先销毁再创建表
// 默认情况下 force = false
Users.sync({
  force: false
}).then(() => {
  console.log('Users is successful')
})
// 添加用户
const createUser = async (user) => {
  await Users.create({
    user_name: user.name,
    user_password: user.user_password,
    user_phone: user.phone
  })
}

module.exports = {
  createUser
}