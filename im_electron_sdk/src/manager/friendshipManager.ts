import { Json_add_friend_param, ErrorResponse } from "../interface";
const ffi = require('ffi-napi');
const ref = require('ref-napi');
import { sdkconfig } from "../interface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";

class  FriendshipManager {
    private _sdkconfig:sdkconfig;
    private stringFormator = (str: string | undefined): Buffer => str ? nodeStrigToCString(str) : Buffer.from("");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1, 
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || ""
        }
    }

    getErrorResponseByCode(code: number) {
        return this.getErrorResponse({ code })
    }

    constructor(config:sdkconfig) {
        this._sdkconfig = config; 
    }

    TIMFriendshipGetFriendProfileList(user_data: string) :Promise<Object> {
        const userData = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMFriendshipAddFriend(json_add_friend_param: Json_add_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_add_friend_param));
        const userData = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddFriend(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMFriendshipCheckFriendType(json_add_friend_param: Json_add_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_add_friend_param));
        const userData = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipCheckFriendType(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
}
export default FriendshipManager;