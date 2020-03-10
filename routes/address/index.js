/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:14:06
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 22:09:38
 */

 const router = require('koa-router')()
 const AddressService = require('../../controllers/addresService')
 router.prefix('/address')
 router.get('/addressList', AddressService.getAddressData)
 router.post('/createOrupdate',AddressService.createOrupdate )
 router.get('/default', AddressService.getDefaultAddress)
 router.get('/changeDefault',AddressService.changeAddressStatu )

 module.exports = router
