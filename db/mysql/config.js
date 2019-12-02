// 生产环境配置数据库
const prodConfig = {
  database: {
    host: '49.235.51.111',    
    port: '3306',  //数据库端口
    user: 'root',  // 用户名
    password: '19970926Ly!', //用户密码
    database: 'SalesLivePlatform'  // 数据库
  }
}
// 开发环境配置数据库
const devConfig = {
  database: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '19970926zg',
    database: 'SalesLivePlatform'
  }
}
const config = process.env.NODE_ENV === 'production'? prodConfig : devConfig
module.exports = config