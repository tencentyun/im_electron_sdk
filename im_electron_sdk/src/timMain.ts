import { ipcMain } from "electron-better-ipc";

import { TIMIPCLISTENR } from "./const/const";
import { initConfig } from "./interface";
import { ipcData } from "./interface/ipcInterface";
import TIM from "./tim";
class TimMain {
    constructor(config:initConfig) {
        const tim = new TIM({
            sdkappid:config.sdkappid
        })
        //建立ipc通信通道
        ipcMain.answerRenderer(TIMIPCLISTENR, async (data:ipcData<any>)=>{
            const { method,manager,param,callback } = JSON.parse(data as unknown as string);
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
            console.log("===================");
            if(timManager){
                //@ts-ignore
                if(timManager[method]){
                    // 这里是个promise或者直接是结果
                    //@ts-ignore
                    try {
                    //@ts-ignore
                        const data = await timManager[method](param);
                        console.log('============data=============', data);
                        return JSON.stringify({ callback, data});
                    }catch(e) {
                        console.log("error", e)
                    }
                }else{
                    throw new Error('no such method , check and try again.')
                }
            }
        })
    }
}
export default TimMain;