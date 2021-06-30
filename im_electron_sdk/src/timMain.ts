import { ipcMain } from "electron";

import { TIMIPCLISTENR,CONSOLETAG } from "./const/const";
import { initConfig } from "./interface";
import { ipcData } from "./interface/ipcInterface";
import TIM from "./tim";

class Callback {
    private requestData;
    private tim;
    private ipcEvent;
    constructor(request: any, timInstance: any, event: any) {
        this.requestData = request;
        this.tim = timInstance;
        this.ipcEvent = event;
    }

    private getManager() {
        const { manager } = this.requestData;
        let timManager;
        switch (manager) {
            case 'timBaseManager':
                timManager = this.tim.getTimbaseManager();
                break;
            case 'advanceMessageManager':
                timManager = this.tim.getAdvanceMessageManager();
                break;
            case 'conversationManager':
                timManager = this.tim.getConversationManager();
                break;
            case 'friendshipManager':
                timManager = this.tim.getFriendshipManager();
                break;
            case 'groupManager':
                timManager = this.tim.getGroupManager();
                break;
            default:
                throw new Error('no such manager,check and try again.')
        }
        return timManager
    }

    async getResponse() {
        const startTime = Date.now();
        const { method, param, callback, manager } = this.requestData;
        console.log('requestData:',this.requestData)
        const timManager = this.getManager();
        if (timManager && timManager[method]) {
            try {
                let responseData;
                if (callback) {
                    console.log("===========add callback successfully==========");
                    //@ts-ignore
                    param.callback = (...args) => {
                        console.log("callback-response");
                        this.ipcEvent.sender.send('global-callback-reply', JSON.stringify({
                            callbackKey: callback,
                            responseData: args
                        }));
                    }
                }

                const isFriendShipOrAdvanceMessageManager = manager === 'friendshipManager' || manager === 'advanceMessageManager';

                if(isFriendShipOrAdvanceMessageManager) {
                    responseData = await timManager[method](...Object.values(param));
                } else {
                    responseData = await timManager[method](param);
                }
                
                console.log(`${CONSOLETAG}${method} is called . user ${Date.now()-startTime} ms.`,`param：${param}`,`data：${responseData}`);
                return JSON.stringify({ callback, data: responseData });
            } catch (error) {
                console.log("some errors", error)
            }
        }
        throw new Error('no such method , check and try again.')
    }
}

class TimMain {
    constructor(config: initConfig) {
        const tim = new TIM({
            sdkappid: config.sdkappid
        })

        //建立ipc通信通道
        ipcMain.handle(TIMIPCLISTENR, async (event, data: ipcData<any>) => {
            const requestData = JSON.parse(data as unknown as string);
            const requestInstance = new Callback(requestData, tim, event);
            const response = await requestInstance.getResponse();
            return response;
        })
    }
}
export default TimMain;