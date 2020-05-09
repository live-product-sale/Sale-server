/*
 * @Description: 评论服务
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-09 20:31:48
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-09 20:40:09
 */
const commentModal = require('../../modal/comment')
const Op = require('sequelize').Op
const { uniformRes } = require('../../util/utils')
const { resCode } = require('../../util/errorCode')

class Comment {
  // 根据商品id获取评论内容
  static async getCommemntByGoodsId(ctx) {
    const { goods_id} = ctx.request.query
    const result = await commentModal.findAll({
      where: { goods_id }
    })
    return ctx.body = uniformRes(resCode.SUCCESS, result)
  }
}
module.exports = Comment