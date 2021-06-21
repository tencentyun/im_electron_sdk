const path = require('path');
const os = require('os');
const ref = require('ref-napi');
const ffipaths:any =  {
  "linux": path.resolve(__dirname,'../lib/linux/lib/libImSDK.so')
}
function getFFIPath(){
    let res = ""
    const platform = os.platform().toLocaleLowerCase();
    switch(platform){
      case 'linux':
      res = ffipaths[platform];
      break;
    }
    if(!res){
      throw new Error(`tencent im sdk not support ${platform} os now.`);
      return;
    }
    return res;
}
function nodeStrigToCString(str:string) :Buffer{
    const buffer = Buffer.from(str)
    return ref.readCString(buffer, 0);
}
export {
    getFFIPath,
    nodeStrigToCString
}
