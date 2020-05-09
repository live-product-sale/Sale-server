/*
 * @Description: 订单评论
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-09 20:08:11
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-09 20:17:39
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const comment = mysql.define("comment", {
  uid: {            // 用户ID
    type: sequelize.STRING
  },
  user_name: {      // 用户姓名
    type: sequelize.STRING
  },
  user_avatar: {    // 用户头像
    type: sequelize.STRING
  },
  goods_id: {       // 商品ID
    type: sequelize.STRING
  },
  order_id: {       // 订单ID
    type: sequelize.STRING
  },
  star_num: {       // 评论等级 最低1颗星， 最高五颗星， 1 - 5
    type: sequelize.STRING
  },
  content: {        // 评论内容
    type: sequelize.STRING
  },
  goods_attr: {     // 商品属性
    type: sequelize.STRING
  },
  comment_date: {    // 评论日期
    type: sequelize.STRING
  }
}, {
  timestamps: false
})
comment.sync({
  force: false
}).then(() => {
  console.log("comment is success")
}).catch(err => {
  throw new Error(err)
})
module.exports = comment
