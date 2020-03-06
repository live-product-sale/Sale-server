const router = require('koa-router')()
const Common = require('../../controllers/commServices')
const PutBucket = require('../../middleware/upTenxunCloud')

router.post('/upload', Common.uploadFile ,PutBucket )

module.exports = router