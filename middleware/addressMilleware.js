const addressModal = require('../modal/address/index');

const changeDefaultAddress = async (ctx, next) => {
  ctx.request.method === 'GET' ?
   { uid, isDefault } = ctx.request.query : { uid, isDefault } = ctx.request.body
  //  console.log(uid, isDefault) 
   if(isDefault) {
     await addressModal.update(
       { isDefault: false}, 
       { where: { uid } }
      )
     await next()
   } else {
     await next()
   }
}

module.exports = {
  changeDefaultAddress
}