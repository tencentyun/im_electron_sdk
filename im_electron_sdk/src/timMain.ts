import { ipcMain } from "electron";

import { TIMIPCLISTENR, CONSOLETAG } from "./const/const";
import { initConfig } from "./interface";
import { ipcData } from "./interface/ipcInterface";
import TIM from "./tim";
import path from "path";
import os from "os";
import { mkdirsSync } from "./utils/utils";
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
                    param
                        ? (responseData = await timManager[method](param))
                        : (responseData = await timManager[method]());
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
    private isLisened = false;
    static _callback: Map<string, Function> = new Map();
    static event: Map<string, any> = new Map();
    static _callingInfo: Map<string, any> = new Map();
    private _tim: TIM;

    constructor(config: initConfig) {
        this._tim = new TIM({
            sdkappid: config.sdkappid,
        });
        if (os.platform() === "linux") {
            mkdirsSync(path.resolve(os.homedir(), ".tencent-im"));
        }
        //建立ipc通信通道
        if (!this.isLisened) {
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
            ipcMain.handle("_setCallInfo", (event, data) => {
                try {
                    const { inviteID, data: callInfo } = JSON.parse(data);
                    this._setCallInfo(inviteID, callInfo);
                } catch (err) {
                    log.info(`_setCallInfo error ${data}`);
                }
            });
            ipcMain.handle("_getCallInfo", (event, data) => {
                try {
                    const { inviteID } = JSON.parse(data);
                    return this._getCallInfo(inviteID);
                } catch (err) {
                    log.info(`_getCallInfo error ${data}`);
                }
            });
            ipcMain.handle("_deleteCallInfo", (event, data) => {
                try {
                    const { inviteID } = JSON.parse(data);
                    return this._deleteCallInfo(inviteID);
                } catch (err) {
                    log.info(`_deleteCallInfo error ${data}`);
                }
            });
            this.isLisened = true;
        }
    }
    private _setCallInfo(inviteID: string, data: object) {
        TimMain._callingInfo.set(inviteID, data);
    }
    private _getCallInfo(inviteID: string): string {
        return JSON.stringify(TimMain._callingInfo.get(inviteID));
    }
    private _deleteCallInfo(inviteID: string) {
        TimMain._callingInfo.delete(inviteID);
    }
    destroy() {
        ipcMain.removeHandler(TIMIPCLISTENR);
        ipcMain.removeHandler("_setCallInfo");
        ipcMain.removeHandler("_getCallInfo");
        ipcMain.removeHandler("_deleteCallInfo");

        this._tim.getTimbaseManager().TIMUninit();
    }
}
export default TimMain;
