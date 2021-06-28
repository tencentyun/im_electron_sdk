import { TIMIPCLISTENR } from "./const/const";
import { initConfig } from "./interface";
import { ipcData } from "./interface/ipcInterface";
import TIM from "./tim";

const {  ipcMain } = require("electron");
class TimMain {
    constructor(config:initConfig) {
        const tim = new TIM({
            sdkappid:config.sdkappid
        })
        //建立ipc通信通道
        ipcMain.on(TIMIPCLISTENR,async (e:any,data:ipcData<any>)=>{
            const { method,manager,param,callback } = data;
            let timManager;
            switch (manager) {
                case 'timBaseManager':
                    timManager = tim.getTimbaseManager();
                    break;
                case 'advanceMessageManager':
                    timManager = tim.getAdvanceMessageManager();
                    break;
                case 'conversationManager':
                    timManager = tim.getConversationManager();
                    break;
                case 'friendshipManager':
                    timManager = tim.getFriendshipManager();
                    break;
                case 'groupManager':
                    timManager = tim.getGroupManager();
                    break;
                default:
                    throw new Error('no such manager,check and try again.')
            }
            if(timManager){
                if(timManager.hasOwnProperty(method)){
                    // 这里是个promise或者直接是结果
                    //@ts-ignore
                    const data = await timManager[method](param)
                    e.reply(TIMIPCLISTENR,{callback,data});
                }else{
                    throw new Error('no such method , check and try again.')
                }
            }
        })
    }
}
export default TimMain;