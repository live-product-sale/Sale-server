/*
 * @Description: 评论路由
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-09 20:29:25
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-09 20:35:56
 */
const router = require('koa-router')()
const commentService = require('../../controllers/commentService')

router.prefix('/comment')

router.get('/content', commentService.getCommemntByGoodsId)

module.exports = router