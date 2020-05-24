const router = require('koa-router')()
const userServices = require('../../controllers/userServices')
const common = require('../../controllers/comm.services')
const checkLogin = require('../../middleware/login.middleware')
const { 
  IsMobile, 
  IsMobileRegisted
} = require('../../middleware/checkMobile')
const checkMobCode = require('../../middleware/checkMobCode')

router.prefix('/user')

// 响应图片验证码
router.get('/login/captcha', common.captcha)
// 响应用户登陆
router.post('/login', checkLogin, userServices.login)
// 更新登陆信息
router.post('/updateLogin', userServices.updateLogin)
// 响应用户注册
router.post('/register',IsMobile, IsMobileRegisted, checkMobCode, userServices.register)
// 响应短信验证码
router.get('/register/sendMsg', IsMobile, common.getMsgCode)
// 响应修改密码
router.post('/modifyPass', IsMobile, checkMobCode ,userServices.modifyPass)
// 获取用户信息
router.get('/userInfo', userServices.getUserInfo )
// 完善用户信息
router.post('/perfect', userServices.perfectUserInfo)
// 获取用户名称
router.get('/username', userServices.getUserNameByuid)
// 密码管理
router.post('/updatePassword', userServices.updatePassword)
// 用户反馈意见
router.post('/advice', userServices.dealAdvice)

module.exports = router