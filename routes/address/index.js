/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:14:06
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-24 10:01:01
 */

 const router           = require('koa-router')()
 const AddressService   = require('../../controllers/addresService')
 const AddressMiddlware = require('../../middleware/address.middleware')

 router.prefix('/address')
 // 获取用户地址信息
 router.get('/addressList', AddressService.getAddressData)
 // 添加地址
 router.post('/createOrupdate',AddressMiddlware.changeDefaultAddress, AddressService.createOrupdate )
 // 获取默认地址
 router.get('/default', AddressService.getDefaultAddress)
 // 改变默认地址
 router.get('/changeDefault',AddressMiddlware.changeDefaultAddress, AddressService.changeAddressStatu )
 // 删除地址
 router.post('/deletebyid', AddressService.deleteAddress)

 module.exports = router
