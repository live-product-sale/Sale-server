/*
 * @Description: pm2 部署配置文件
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-04-06 22:34:11
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-04-06 22:40:46
 */
module.exports = {
  apps : [{
    name: "app",
    script: "./bin/www",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}