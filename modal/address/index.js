/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 10:26:30
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 11:51:41
 */
const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const address = mysql.define('address', {
  uid: {          // 用户ID
    type: Sequelize.STRING
  },
  name: {          // 用户名称
    type: Sequelize.STRING
  },
  mobile: {        // 用户手机
    type: Sequelize.STRING
  },
  address: {       // 详细地址
    type: Sequelize.STRING
  },
  area: {           // 区域
    type: Sequelize.STRING
  },
  isDefault: {      // 是否是默认地址
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})
address.sync({
  force: false
}).then(() => {
  console.log('address is successful')
})

module.exports = address