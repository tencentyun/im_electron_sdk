import { TIMIPCLISTENR } from "./const/const";
import { loginParam, CreateGroupParams, commonResponse } from "./interface";
import { ipcData, Managers, ITimRender } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";

const electron = require('electron')
export class TimRender implements ITimRender  {
    runtime:Map<Symbol,Function> = new Map();
    constructor() {
        console.log(electron.webContents)
        // ipcRenderer.on(TIMIPCLISTENR,(e:any,res:mainRes)=>{
        //     console.log(e);
        //     const { callback,data } = res;
            
        //     if(this.runtime.has(callback)){
        //          //@ts-ignore
        //          this.runtime.get(callback)(data);
        //     }else{
        //         throw new Error('no such callback.')
        //     }
        // })
    }
    private async call(data:any): Promise<commonResponse>  {
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
    init() {
       return this.call({
           method: 'TIMInit',
           manager: 'timBaseManager',
       }); 
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
    }
}