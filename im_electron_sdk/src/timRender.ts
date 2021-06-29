import { TIMIPCLISTENR } from "./const/const";
import { loginParam, CreateGroupParams, commonResponse, logoutParam, getLoginUserIDParam, GroupAttributeCallbackParams, InitGroupAttributeParams, DeleteAttributeParams, GroupTipsCallbackParams, TIMSetNetworkStatusListenerCallbackParam } from "./interface";
import { ipcData, Managers, ITimRender } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";
import { setConvEventCallback } from "./interface/conversationInterface";

const electron = require('electron')

const getUniKey = (length: number) => Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);

export class TimRender implements ITimRender  {
    static runtime:Map<string,Function> = new Map();
    static isListened = false
    constructor() {
        if(!TimRender.isListened){
            ipcRenderer.on('global-callback-reply',(e:any,res:any)=>{
                const { callbackKey, responseData } = JSON.parse(res);
                console.log(TimRender.runtime,'2233')
                if(TimRender.runtime.has(callbackKey)){
                     //@ts-ignore
                     TimRender.runtime.get(callbackKey)(responseData);
                }
            })
            TimRender.isListened = true
        }
    }
    
    private async call(data:any): Promise<commonResponse> {
        const response = await ipcRenderer.invoke(TIMIPCLISTENR, JSON.stringify(data));
        return JSON.parse(response);
    };
    setConvEventCallback(param:setConvEventCallback){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetConvEventCallback',
            manager: Managers.conversationManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    setNetworkStatusListenerCallback(param:TIMSetNetworkStatusListenerCallbackParam){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetNetworkStatusListenerCallback',
            manager: Managers.timBaseManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    uninit(){
        const formatedData = {
            method: 'TIMUninit',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData);
    }
    getSDKVersion(){
        const formatedData = {
            method: 'TIMGetSDKVersion',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    getServerTime(){
        const formatedData = {
            method: 'TIMGetServerTime',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    logout(param:logoutParam){
        const formatedData = {
            method: 'TIMLogout',
            manager: Managers.timBaseManager,
            param: param,
        }
        return this.call(formatedData)
    }
    init() {
       return this.call({
           method: 'TIMInit',
           manager: Managers.timBaseManager,
       }); 
    }
    getLoginStatus(){
        const formatedData = {
            method: 'TIMGetLoginStatus',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    getLoginUserID(param:getLoginUserIDParam){
        const formatedData = {
            method: 'TIMGetLoginUserID',
            manager: Managers.timBaseManager,
            param: param,
        }
        return this.call(formatedData)
    }
    login(data: loginParam) {
        const formatedData = {
            method: 'TIMLogin',
            manager: Managers.timBaseManager,
            param: data,
        }
         return this.call(formatedData);
    };

    createGroup(data: CreateGroupParams) {
        const formatedData: ipcData<CreateGroupParams> = {
            method: 'TIMGroupCreate',
            manager: Managers.groupManager,
            // callback,
            param: data,
        }
        return this.call(formatedData);
    };

    initGroupAttribute(initAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: 'TIMGroupInitGroupAttributes',
            manager: Managers.groupManager,
            param: initAttributesParams
        }
        return this.call(formatedData);
    }

    setGroupAttribute(setAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: 'TIMGroupSetGroupAttributes',
            manager: Managers.groupManager,
            param: setAttributesParams
        }
        return this.call(formatedData);
    }

    deleteGroupAttribute(deleteAttributesParams: DeleteAttributeParams) {
        const formatedData = {
            method: 'TIMGroupDeleteGroupAttributes',
            manager: Managers.groupManager,
            param: deleteAttributesParams
        }
        return this.call(formatedData);
    }

    getGroupAttribute(getAttributeParams: DeleteAttributeParams) {
        const formatedData = {
            method: 'TIMGroupGetGroupAttributes',
            manager: Managers.groupManager,
            param: getAttributeParams
        }
        return this.call(formatedData);
    }

    groupAttributeChangedCallback(data: GroupAttributeCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: 'TIMSetGroupAttributeChangedCallback',
            manager: Managers.groupManager,
            callback,
            param: data
        }

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    
    groupTipsChangedCallback(data: GroupTipsCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: 'TIMSetGroupTipsEventCallback',
            manager: Managers.groupManager,
            callback,
            param: data
        }

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    testCallback(data: GroupAttributeCallbackParams) {
        const callback = getUniKey(10);
        const formatedData = {
            method: 'testCallback',
            manager: Managers.groupManager,
            callback,
            param: data
        }

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }
}