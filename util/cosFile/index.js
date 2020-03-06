const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')

const cos = new COS({
  SecretId: 'AKIDg0A5oIyrdB2fCXpQLp5SaTFnSr7BDdz5',
  SecretKey: '0LdlfKSLRKzQcdR5SZUAdrcBWdiz1pSs'
})

const BucketConfig = {
  Bucket: 'prod-live-1300616667',
  Region: 'https://prod-live-1300616667.cos.ap-shanghai.myqcloud.com'
}

/**
 * 上传对象, 适合上传小文件，不适合上传大文件
 * @param { Object } fileObject
 */
const putBucket = ({name, path}) => {
  return new Promise((resolve, reject) => {
    cos.putObject({
       Bucket: BucketConfig.Bucket,
       Region: BucketConfig.Region,
       Key: name,
       StorageClass: 'STANDARD',
       Body: fs.createReadStream(path), // 上传文件对象
       onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
       }
    }, (err, data) => {
      console.log(err || data)
      if(err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
putBucket()
module.exports = {
  putBucket
}