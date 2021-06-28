import { CommonCallbackFun, commonResponse, sdkconfig } from "../interface";
import { convCreate, convDelete, getConvList, convSetDrat, convCancelDraft, convGetConvInfo, convPinConversation, convGetTotalUnreadMessageCount, setConvEventCallback, convTotalUnreadMessageCountChangedCallback, convTotalUnreadMessageCountChangedCallbackParam } from "../interface/conversationInterface";
import { jsFuncToFFIConvEventCallback, jsFuncToFFIFun, jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback, nodeStrigToCString } from "../utils/utils";

class ConversationManager {

    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
    TIMConvCreate(param:convCreate) :Promise<commonResponse>{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvCreate(convId,convType,callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMConvDelete(param:convDelete) :Promise<commonResponse>{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvDelete(convId,convType,callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMConvGetConvList(param:getConvList) :Promise<commonResponse>{
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvGetConvList(callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMConvSetDraft(param:convSetDrat) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const draftParam = nodeStrigToCString(JSON.stringify(param.draftParam))
        return this._sdkconfig.Imsdklib.TIMConvSetDraft(convId,convType,draftParam);
    }
    TIMConvCancelDraft(param:convCancelDraft) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        return this._sdkconfig.Imsdklib.TIMConvCancelDraft(convId,convType);
    }
    TIMConvGetConvInfo(param:convGetConvInfo) :Promise<commonResponse>{
        const convList = nodeStrigToCString(JSON.stringify(param.json_get_conv_list_param));
        const userData = param.user_data?nodeStrigToCString(param.user_data):Buffer.from("");
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvGetConvInfo(convList,callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMConvPinConversation(param:convPinConversation) :Promise<commonResponse>{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const isPinged = param.isPinged
        const userData = param.user_data?nodeStrigToCString(param.user_data):Buffer.from("")
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvPinConversation(convId,convType,isPinged,callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMConvGetTotalUnreadMessageCount(param:convGetTotalUnreadMessageCount) :Promise<commonResponse>{
        const userData = param.user_data?nodeStrigToCString(param.user_data):Buffer.from("")
        return new Promise((resolve,reject)=>{
            const cb:CommonCallbackFun = (code,desc,json_param,user_data)=>{
                if(code===0){
                    resolve({code,desc,json_param,user_data})
                }else{
                    reject({code,desc,json_param,user_data})
                }
            }
            const callback = jsFuncToFFIFun(cb);
            const code:number = this._sdkconfig.Imsdklib.TIMConvGetTotalUnreadMessageCount(callback,userData);
            code !== 0 && reject({code});
        })
    }
    TIMSetConvEventCallback(param:setConvEventCallback) :void{
        const callback = jsFuncToFFIConvEventCallback(param.callback);
        const userData = param.user_data?nodeStrigToCString(param.user_data):Buffer.from("")
        this._sdkconfig.Imsdklib.TIMSetConvEventCallback(callback,userData);
    }
    TIMSetConvTotalUnreadMessageCountChangedCallback(param:convTotalUnreadMessageCountChangedCallbackParam) :void{
        const callback = jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback(param.callback);
        const userData = param.user_data?nodeStrigToCString(param.user_data):Buffer.from("")
        this._sdkconfig.Imsdklib.TIMSetConvTotalUnreadMessageCountChangedCallback(callback,userData);
    }
}
export default ConversationManager;