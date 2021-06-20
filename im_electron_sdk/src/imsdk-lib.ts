import { getFFIPath } from "./utils/utils";
const ffi = require('ffi-napi');
const ref = require('ref-napi');

const ffiPath = getFFIPath();
const Imsdklib = ffi.Library(ffiPath,{
      "TIMGetSDKVersion":[ref.types.char,[]],
      "TIMInit": [ref.types.int,[ref.types.uint64,ref.types.CString]],
      "TIMLogin":[ref.types.int,[ref.types.CString,ref.types.CString,'pointer',ref.types.CString]]
});

export default Imsdklib;