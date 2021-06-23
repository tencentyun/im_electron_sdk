import { Json_add_friend_param, ErrorResponse } from "../interface";
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

    TIMFriendshipHandleFriendAddRequest(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipModifyFriendProfile(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipDeleteFriend(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipCheckFriendType(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipCreateFriendGroup(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipGetFriendGroupList(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipModifyFriendGroup(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipDeleteFriendGroup(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipAddToBlackList(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipGetBlackList(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
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
    TIMFriendshipDeleteFromBlackList(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipGetPendencyList(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipDeletePendency(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipReportPendencyReaded(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_friendship_param));
        const userData = this.stringFormator(user_data);
        const timestamp = +new Date;
    
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
    TIMFriendshipSearchFriends(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
    TIMFriendshipGetFriendsInfo(json_friendship_param: Json_add_friend_param, user_data: string) :Promise<any> {
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
}
export default FriendshipManager;