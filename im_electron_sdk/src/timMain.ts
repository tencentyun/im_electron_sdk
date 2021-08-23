import { ipcMain } from "electron";

import { TIMIPCLISTENR, CONSOLETAG } from "./const/const";
import { initConfig } from "./interface";
import { ipcData } from "./interface/ipcInterface";
import TIM from "./tim";
import log from "./utils/log";

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
            case "timBaseManager":
                timManager = this.tim.getTimbaseManager();
                break;
            case "advanceMessageManager":
                timManager = this.tim.getAdvanceMessageManager();
                break;
            case "conversationManager":
                timManager = this.tim.getConversationManager();
                break;
            case "friendshipManager":
                timManager = this.tim.getFriendshipManager();
                break;
            case "groupManager":
                timManager = this.tim.getGroupManager();
                break;
            default:
                throw new Error("no such manager,check and try again.");
        }
        return timManager;
    }

    async getResponse(cb?: Function) {
        const startTime = Date.now();
        const { method, param, callback } = this.requestData;
        console.log("requestData:", this.requestData);
        const timManager = this.getManager();
        if (timManager && timManager[method]) {
            try {
                let responseData;
                if (callback) {
                    console.log(
                        "===========add callback successfully=========="
                    );
                    //@ts-ignore
                    param.callback = cb;
                }
                try {
                    log.info(`${method} 入参:`, param);
                    responseData = await timManager[method](param);
                } catch (err) {
                    log.info(`${method} error:`, err);
                    responseData = err;
                }

                console.log(
                    `${CONSOLETAG}${method} is called . use ${
                        Date.now() - startTime
                    } ms.`,
                    `param：${param}`,
                    `data：${responseData}`
                );
                return JSON.stringify({ callback, data: responseData });
            } catch (error) {
                console.log("some errors", error);
            }
        }
        throw new Error("no such method , check and try again.");
    }
}

class TimMain {
    static isLisened = false;
    static _callback: Map<string, Function> = new Map();
    static event: Map<string, any> = new Map();
    private _tim: TIM;
    constructor(config: initConfig) {
        this._tim = new TIM({
            sdkappid: config.sdkappid,
        });

        //建立ipc通信通道
        if (!TimMain.isLisened) {
            ipcMain.handle(TIMIPCLISTENR, async (event, data: ipcData<any>) => {
                const requestData = JSON.parse(data as unknown as string);
                const { callback, method } = requestData;
                let cb;
                if (callback) {
                    TimMain.event.set(callback, event);
                    cb = (...args: any) => {
                        console.log("callback-response", method);
                        if (TimMain.event.get(method)) {
                            try {
                                TimMain.event.get(method).sender?.send(
                                    "global-callback-reply",
                                    JSON.stringify({
                                        callbackKey: callback,
                                        responseData: args,
                                    })
                                );
                            } catch (err) {
                                log.error("主渲染窗口事件绑定丢失", err);
                                console.log("主渲染窗口事件绑定丢失", err);
                            }
                        } else {
                            log.error("主渲染窗口事件绑定丢失");
                            console.log("全局回调事件对象丢失");
                        }
                    };
                    TimMain._callback.set(callback, cb);
                }
                const requestInstance = new Callback(
                    requestData,
                    this._tim,
                    event
                );
                const response = await requestInstance.getResponse(
                    callback ? TimMain._callback.get(callback) : () => {}
                );
                return response;
            });
            TimMain.isLisened = true;
        }
    }
    destroy() {
        this._tim.getTimbaseManager().TIMUninit();
    }
}
export default TimMain;
