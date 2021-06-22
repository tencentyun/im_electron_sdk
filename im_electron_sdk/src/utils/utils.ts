import { CommonCallbackFun } from '../interface'
const path = require('path');
const os = require('os');
const ref = require('ref-napi');
const ffi = require('ffi-napi');

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
function jsFuncToFFIFun(fun:CommonCallbackFun){
  const callback = ffi.Callback('void', [ref.types.int32, ref.types.CString,ref.types.CString,ref.types.CString],
      function (code:number, desc:Buffer,json_params:Buffer,user_data:Buffer) {
        fun(code,desc,json_params,user_data);
    });
  return callback;
}
export {
    getFFIPath,
    nodeStrigToCString,
    jsFuncToFFIFun
}
