const router = require('koa-router')()
const userServices = require('../../controllers/customerServices/cusController')
const common = require('../../controllers/commServices')

router.prefix('/user')
router.get('/login/captcha', common.captcha)
router.post('/login', userServices.login)
router.post('/register', userServices.register)


module.exports = router