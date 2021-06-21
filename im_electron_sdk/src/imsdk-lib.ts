import { getFFIPath } from "./utils/utils";
import StructType from 'ref-struct-napi';

const ffi = require('ffi-napi');
const ref = require('ref-napi');
const ffiPath = getFFIPath();
const Imsdklib = ffi.Library(ffiPath,{
      "TIMGetSDKVersion":[ref.types.CString,[]],
      "TIMInit": [ref.types.int,[ref.types.uint64,ref.types.CString]],
      "TIMLogin":[ref.types.int,[ref.types.CString,ref.types.CString,'pointer',ref.types.CString]],
      "TIMUninit":[ref.types.int,[]],
      "TIMGetServerTime":[ref.types.uint64,[]],
      "TIMLogout":[ref.types.int,['pointer',ref.types.CString]],
      // "TIMGetLoginStatus":[[ref.refType(StructType({
      //       kTIMLoginStatus_Logined:ref.types.int,
      //       kTIMLoginStatus_Logining:ref.types.int,
      //       kTIMLoginStatus_UnLogined:ref.types.int,
      //       kTIMLoginStatus_Logouting:ref.types.int,
      // }))],[]],
      "TIMGroupCreate": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupDelete": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupJoin": [ref.types.int, [ref.types.CString, ref.types.CString, 'pointer', ref.types.CString]],
});

export default Imsdklib;