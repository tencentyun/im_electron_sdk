import { CommonCallbackFun, loginParam, sdkconfig } from "../interface/inerface";
import path from "path";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";
const ffi = require('ffi-napi');
const ref = require('ref-napi');

class  FriendshipManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }

    TIMFriendshipGetFriendProfileList() :Promise<Object> {
        const userData = Buffer.from("");

        return new Promise((resolve, reject) => {
            this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(
                ffi.Callback('void', [ref.types.int32, ref.types.CString,ref.types.CString,ref.types.CString],
                    function (code:number, desc:Buffer,json_params:Buffer,user_data:Buffer) {
                        resolve({code,desc,json_params,user_data});
                }),userData);
        })
    }  
}
export default FriendshipManager;