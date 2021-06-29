import { TIMIPCLISTENR } from "./const/const";
import { loginParam, CreateGroupParams, commonResponse, logoutParam, getLoginUserIDParam, GroupAttributeCallbackParams, InitGroupAttributeParams, DeleteAttributeParams, GroupTipsCallbackParams } from "./interface";
import { ipcData, Managers, ITimRender } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";

const electron = require('electron')

const getUniKey = (length: number) => Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);

export class TimRender implements ITimRender  {
    runtime:Map<string,Function> = new Map();
    constructor() {
        ipcRenderer.on('global-callback-reply',(e:any,res:any)=>{
            const { callbackKey, responseData } = JSON.parse(res);
            
            if(this.runtime.has(callbackKey)){
                 //@ts-ignore
                 this.runtime.get(callbackKey)(responseData);
            }else{
                throw new Error('no such callback.')
            }
        })
    }
    private async call(data:any): Promise<commonResponse> {
        const response = await ipcRenderer.invoke(TIMIPCLISTENR, JSON.stringify(data));
        return JSON.parse(response);
    };
    // login(data:any){
    //     return new Promise<void>((resolve)=>{
    //         const callback = Symbol();
    //         data.callback = callback;
    //         this.runtime.set(callback,()=>{
    //             resolve()
    //         })
    //         this.call(data);
    //     })
    // }
    uninit(){
        const formatedData = {
            method: 'TIMUninit',
            manager: Managers.timBaseManager,
            // callback,
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
            // callback,
        }
        return this.call(formatedData)
    }
    logout(param:logoutParam){
        const formatedData = {
            method: 'TIMLogout',
            manager: Managers.timBaseManager,
            // callback,
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
            // callback,
        }
        return this.call(formatedData)
    }
    getLoginUserID(param:getLoginUserIDParam){
        const formatedData = {
            method: 'TIMGetLoginUserID',
            manager: Managers.timBaseManager,
            // callback,
            param: param,
        }
        return this.call(formatedData)
    }
    login(data: loginParam) {
        // const callback = Symbol();
        // data.callback = callback;
        const formatedData = {
            method: 'TIMLogin',
            manager: Managers.timBaseManager,
            // callback,
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

        this.runtime.set(callback, data.callback);
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

        this.runtime.set(callback, data.callback);
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

        this.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }
}