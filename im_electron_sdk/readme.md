#### 腾讯云即时通信IM Electron API

基于腾讯云即时通信IM跨平台 C接口封装，接口与C接口保持一致。

#### 支持平台

Windows、Linux（uos）

#### 使用

```javascript
// 主进程
const TimMain = require('im_electron_sdk')

const sdkappid = 0;// 可以去腾讯云即时通信IM控制台申请
const tim = new TimMain({
  sdkappid:sdkappid
})

//渲染进程

const TimRender = require('im_electron_sdk')
const timRender = new TimRender();
// 初始化
timRender.TIMInit()
// 登录
timRender.TIMLogin({
  userID:"userID",
  userSig:"userSig" // 参考userSig生成
}).then(()=>{
  // success
}).catch(err=>{
  // error
})
// 其他api
```

#### API列表

接口名与C接口保持一致，返回结果如有异步，都为Promise

[C接口文档](https://cloud.tencent.com/document/product/269/33546)


