/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:11:59
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-28 14:04:35
 */
const addressModal = require('../../modal/address')
const { ResFormat } = require('../../util/utils')

class AddressServie {
  // 获取用户的收件地址
   static async getAddressData(ctx) {
      const { uid } = ctx.request.query
      const data = await addressModal.findAll({
        where: { uid }
      })
      return ctx.body = ResFormat("000000", data, "ok")
   }
   //更新或创建地址
   static async createOrupdate(ctx) {
     const data = ctx.request.body
     const address_id = data.id
     const uid = data.uid
     console.log(data)
     if(data.action == "edit") {
       data.action = undefined
      //  console.log(data.isDefault)
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
     return ctx.body = ResFormat("000000", null, "ok")
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
     return ctx.body = ResFormat("000000", result , "ok")
   }
   // 修改地址状态
   static async changeAddressStatu (ctx) {
     const {uid, id, isDefault} = ctx.request.query
     console.log(id)
     const defaultAddress = await addressModal.findOne({
       where: { uid, isDefault: true},
       attributes: ["id", "uid"]
     })
     if(!defaultAddress) {
      await addressModal.update(
        {isDefault }, 
        { where: { uid, id } })
     } else {
      await addressModal.update({
        isDefault: false
      }, { where: {id: defaultAddress.id, uid: defaultAddress.uid}})
      await addressModal.update(
        {isDefault }, 
        { where: { uid, id } })
     }
    
     
     return ctx.body = {
       code: "000000",
       data: null,
       msg: "ok"
     }
   }
   // 删除地址
   static async deleteAddress(ctx) {
     const {id, uid} = ctx.request.body
     const result = await addressModal.destroy({
       where: { id, uid }
     })
     return ctx.body = ResFormat("000000", result , "删除成功")
   }
}
module.exports = AddressServie