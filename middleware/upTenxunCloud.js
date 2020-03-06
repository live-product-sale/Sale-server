const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')

const cos = new COS({
  AppId:'1300616667',
  SecretId:'AKIDg0A5oIyrdB2fCXpQLp5SaTFnSr7BDdz5',
  SecretKey:'0LdlfKSLRKzQcdR5SZUAdrcBWdiz1pSs'
})

const BucketConfig = {
  Bucket: 'prodlive-1300616667',
  Region: 'ap-shanghai'
}

/**
 * 上传对象, 适合上传小文件，不适合上传大文件
 * @param { String } fileName  图片名称
 * @param { String } filePath  图片在本地缓存路径
 * @param { Object } data
 */
const putBucket = (fileName, filePath) => {
    return new Promise((resolve, reject) => {
      cos.multipartUpload({
        Bucket: BucketConfig.Bucket,
        Region: BucketConfig.Region,
        Key: fileName,
        ContentLength: '1024',
        UploadId: fileName,
        PartNumber: '1',
        Body: fs.createReadStream(filePath), // 上传文件对象  
     }, (err, data) => {
       if(err) {
         console.log('err',err)
         reject(err)
       }
       resolve(data)
     })
    }) 
}
const upTenXunCloud = async (ctx) => {
  let { fileName, filePath } = ctx.request.body
  console.log(filePath, 'cloud')
  putBucket(fileName, filePath).then(res => {
    console.log(res)
    console.log(res)
  return ctx.body = {}
  })
  
}
// putBucket('c993458a-541f-438c-93d7-aae2aa42429c.png', '/root/Sale-server/controllers/upload-static/images/123456/苹果/c993458a-541f-438c-93d7-aae2aa42429c.png')
module.exports = upTenXunCloud