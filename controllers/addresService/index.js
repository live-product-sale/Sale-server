/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:11:59
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 22:14:30
 */
const addressModal = require('../../modal/address')

class AddressServie {
  // 获取用户的收件地址
   static async getAddressData(ctx) {
      const { uid } = ctx.request.query
      const data = await addressModal.findAll({
        where: { uid }
      })
      return ctx.body = {
        code: "000000",
        data,
        msg: "ok"
      }
   }
   //更新或创建地址
   static async createOrupdate(ctx) {
     const data = ctx.request.body
     const address_id = data.id
     const uid = data.uid
    //  console.log(data)
     if(data.action == "edit") {
       data.action = undefined
       console.log(data.isDefault)
       await addressModal.update({
         name: data.name,
         mobile: data.mobile,
         addressName: data.addressName,
         address: data.address,
         area: data.area,
         isDefault: data.isDefault
       }, {
         where: {
           id: address_id,
           uid
         }
       })
     } else {
       await addressModal.create({...data, action: undefined })
     } 
     return ctx.body = {
       code: "000000",
       data: null,
       msg: "ok"
     }
   }
   // 获取默认地址
   static async getDefaultAddress(ctx) {
     const {uid} = ctx.request.query
     const result = await addressModal.findOne({
       where: {
         uid,
         isDefault: true
       }
     })
     return ctx.body = {
       code: "000000",
       data: result,
       msg: "ok"
     }
   }
   // 修改地址状态
   static async changeAddressStatu (ctx) {
     const {uid} = ctx.request.query
     await addressModal.update(
      {isDefault: false }, 
      {
       where: { uid, isDefault: true }
     })
     return ctx.body = {
       code: "000000",
       data: null,
       msg: "ok"
     }
   }
}
module.exports = AddressServie