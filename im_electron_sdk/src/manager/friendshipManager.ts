import { 
    Json_add_friend_param, 
    Json_delete_friend_param,
    Json_modify_friend_info_param,
    Json_handle_friend_add_param,
    Json_check_friend_list_param,
    Json_create_friend_group_param,
    Json_modify_friend_group_param,
    Json_get_pendency_list_param,
    Json_delete_pendency_param,
    Json_search_friends_param,
    ErrorResponse,
    sdkconfig,
    commonResponse
} from "../interface";
import {
    TIMOnAddFriendCallback,
    TIMOnDeleteFriendCallback,
    TIMUpdateFriendProfileCallback,
    TIMFriendAddRequestCallback,
    TIMFriendApplicationListDeletedCallback,
    TIMFriendApplicationListReadCallback,
    TIMFriendBlackListAddedCallback,
    TIMFriendBlackListDeletedCallback
} from "../interface/friendshipInterface"
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";
const ffi = require('ffi-napi');
const ref = require('ref-napi');

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

    TIMFriendshipGetFriendProfileList(user_data: string) :Promise<commonResponse> {
        const userData = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_param, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_param, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMFriendshipAddFriend(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
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

    TIMFriendshipHandleFriendAddRequest(json_friendship_param: Json_handle_friend_add_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipHandleFriendAddRequest(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipModifyFriendProfile(json_friendship_param: Json_modify_friend_info_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendProfile(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipDeleteFriend(json_friendship_param: Json_delete_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriend(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipCheckFriendType(json_friendship_param: Json_check_friend_list_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
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
    TIMFriendshipCreateFriendGroup(json_friendship_param: Json_create_friend_group_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipCreateFriendGroup(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipGetFriendGroupList(json_friendship_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendGroupList(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipModifyFriendGroup(json_friendship_param: Json_modify_friend_group_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendGroup(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipDeleteFriendGroup(json_friendship_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriendGroup(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipAddToBlackList(json_friendship_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddToBlackList(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipGetBlackList(user_data: string) :Promise<any> {
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetBlackList(callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipDeleteFromBlackList(json_friendship_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFromBlackList(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipGetPendencyList(json_friendship_param: Json_get_pendency_list_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetPendencyList(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipDeletePendency(json_friendship_param: Json_delete_pendency_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeletePendency(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipReportPendencyReaded(timestamp: number, user_data: string) :Promise<any> {
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipReportPendencyReaded(timestamp, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipSearchFriends(json_friendship_param: Json_search_friends_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipSearchFriends(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    TIMFriendshipGetFriendsInfo(json_friendship_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendsInfo(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    // callback begin
    TIMSetOnAddFriendCallback(tIMOnAddFriendCallback: TIMOnAddFriendCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data:Buffer) {
                tIMOnAddFriendCallback(json_msg_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetOnAddFriendCallback(callback, c_user_data)
    }

    TIMSetOnDeleteFriendCallback(tIMOnDeleteFriendCallback: TIMOnDeleteFriendCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data:Buffer) {
                tIMOnDeleteFriendCallback(json_identifier_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetOnDeleteFriendCallback(callback, c_user_data)
    }

    TIMSetUpdateFriendProfileCallback(tIMUpdateFriendProfileCallback: TIMUpdateFriendProfileCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_friend_profile_update_array: Buffer, user_data:Buffer) {
                tIMUpdateFriendProfileCallback(json_friend_profile_update_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetUpdateFriendProfileCallback(callback, c_user_data)
    }

    TIMSetFriendAddRequestCallback(tIMFriendAddRequestCallback: TIMFriendAddRequestCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_friend_add_request_pendency_array: Buffer, user_data:Buffer) {
                tIMFriendAddRequestCallback(json_friend_add_request_pendency_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetFriendAddRequestCallback(callback, c_user_data)
    }

    TIMSetFriendApplicationListDeletedCallback(tIMOnAddFriendCallback: TIMOnAddFriendCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data:Buffer) {
                tIMOnAddFriendCallback(json_msg_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListDeletedCallback(callback, c_user_data)
    }

    TIMSetFriendApplicationListReadCallback(tIMFriendApplicationListReadCallback: TIMFriendApplicationListReadCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (user_data:Buffer) {
                tIMFriendApplicationListReadCallback(user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListReadCallback(callback, c_user_data)
    }

    TIMSetFriendBlackListAddedCallback(tIMFriendBlackListAddedCallback: TIMFriendBlackListAddedCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_friend_black_added_array: Buffer, user_data:Buffer) {
                tIMFriendBlackListAddedCallback(json_friend_black_added_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetFriendBlackListAddedCallback(callback, c_user_data)
    }

    TIMSetFriendBlackListDeletedCallback(tIMFriendBlackListDeletedCallback: TIMFriendBlackListDeletedCallback, user_data: string): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(ref.types.void, [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data:Buffer) {
                tIMFriendBlackListDeletedCallback(json_identifier_array.toString(), user_data.toString());
        });

        this._sdkconfig.Imsdklib.TIMSetFriendBlackListDeletedCallback(callback, c_user_data)
    }
    // callback end
}
export default FriendshipManager;