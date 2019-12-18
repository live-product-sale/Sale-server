const router = require('koa-router')()
const userServices = require('../../controllers/user')

// router.prefix('/user')
router.post('/login', userServices.login)

module.exports = router