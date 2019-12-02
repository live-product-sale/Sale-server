// 处理商家业务
const Users = require('../../db/users/index')

// 添加用户
const createUser = async (user) => {
  await Users.create({
    user_name: user.name,
    user_password: user.password,
    user_phone: user.phone
  })
}
module.exports = {
  createUser
}