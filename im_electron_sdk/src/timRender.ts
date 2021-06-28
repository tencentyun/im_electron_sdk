import { TIMIPCLISTENR } from "./const/const";
import { mainRes } from "./interface/ipcInterface";
import { ipcRenderer} from "electron-better-ipc";


const electron = require('electron')
export class TimRender {
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
    private async call(data:any) {
        // ipcRenderer.send(TIMIPCLISTENR, data)
        const response = await ipcRenderer.callMain(TIMIPCLISTENR, JSON.stringify(data));
        console.log("response", response);
        return response;
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

    public login(data: any) {
        const callback = Symbol();
        data.callback = callback;
        const formatedData = {
            method: 'TIMLogin',
            manager: 'timBaseManager',
            callback,
            param: data,
        }
        return this.call(formatedData);
    };
}
// export default TimRender;