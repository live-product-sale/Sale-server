/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:11:59
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-28 18:14:31
 */
const addressModal = require('../../modal/address')
const { uniformRes } = require('../../util/utils')
const { errMsg, resCode } = require('../../util/errorCode')

class AddressServie {
  // 获取用户的收件地址
  static async getAddressData(ctx) {
    const { uid } = ctx.request.query
    try {
      const data = await addressModal.findAll({
        where: { uid }
      })
      return ctx.body = uniformRes(resCode.SUCCESS, data, errMsg[resCode.SUCCESS])
    } catch(err) {
      return ctx.body = uniformRes(resCode.ERROR, data, errMsg[resCode.ERROR])
    }
  }
  //更新或创建地址
  static async createOrupdate(ctx) {
    const data = ctx.request.body
    const address_id = data.id
    const uid = data.uid
    try {
      if (data.action == "edit") {
        data.action = undefined
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
        await addressModal.create({ ...data, action: undefined })
      }
      return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    } catch (err) {
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 获取默认地址
  static async getDefaultAddress(ctx) {
    const { uid } = ctx.request.query
    try {
      const result = await addressModal.findOne({
        where: {
          uid,
          isDefault: true
        }
      })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch(err) {
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 修改地址状态
  static async changeAddressStatu(ctx) {
    const { uid, id, isDefault } = ctx.request.query
    try {
      const defaultAddress = await addressModal.findOne({
        where: { uid, isDefault: true },
        attributes: ["id", "uid"]
      })
      if (!defaultAddress) {
        await addressModal.update(
          { isDefault },
          { where: { uid, id } })
      } else {
        await addressModal.update({
          isDefault: false
        }, { where: { id: defaultAddress.id, uid: defaultAddress.uid } })
        await addressModal.update(
          { isDefault },
          { where: { uid, id } })
      }
      return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    } catch(err) {
      return ctx.body = uniformRes(resCode.ERROR, null, errMsg[resCode.ERROR])
    }
  }
  // 删除地址
  static async deleteAddress(ctx) {
    const { id, uid } = ctx.request.body
    try {
      const result = await addressModal.destroy({
        where: { id, uid }
      })
      return ctx.body = uniformRes(resCode.SUCCESS, result, errMsg[resCode.SUCCESS])
    } catch(err) {
      return ctx.body = uniformRes(resCode.SUCCESS, null, errMsg[resCode.SUCCESS])
    }
  }
}
module.exports = AddressServie