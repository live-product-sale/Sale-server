const config = require('./config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',  //使用数据库类型
  pool: {  
    //线程池
    max: 20,  //最大连接数量
    min: 1,   //最少连接数量
    idle: 10000 //线程在10S内没有操作就会释放
  }
})

// 测试数据库连接成功
sequelize.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch((err) => {
  console.log(err)
})

module.exports = sequelize
