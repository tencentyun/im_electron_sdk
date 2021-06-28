import { TIMIPCLISTENR } from "./const/const";
import { mainRes } from "./interface/ipcInterface";

const electron = require('electron')
class TimRender {
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
    private call(data:any){
        // ipcRenderer.send(TIMIPCLISTENR, data)
    }
    login(data:any){
        return new Promise<void>((resolve)=>{
            const callback = Symbol();
            data.callback = callback;
            this.runtime.set(callback,()=>{
                resolve()
            })
            this.call(data);
        })
    }
}
export default TimRender;

const ipc = new TimRender();

ipc.login('da')