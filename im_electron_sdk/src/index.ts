import { CONSOLETAG } from "./const/const";
import Imsdklib from "./imsdk-lib";
import { initConfig, sdkconfig } from "./interface";
import AdvanceMessageManage from "./manager/advanceMessageManager";
import ConversationManager from "./manager/conversationManager";
import FriendshipManager from "./manager/friendshipManager";
import GroupManager from "./manager/groupManager";
import TimbaseManager from "./manager/timbaseManager";
import { ipcMain, ipcRenderer } from "electron";

let initSDKResolver: any;

const initSDKPromise: Promise<TIM> = new Promise((resolve, reject) => initSDKResolver = resolve);

class TIM {
    private _sdkconfig: sdkconfig = {
        sdkappid: 0,
        consoleTag: CONSOLETAG,
        Imsdklib: Imsdklib,
    }
    private _advanceMessageManager: AdvanceMessageManage;
    private _conversationManager: ConversationManager;
    private _friendshipManager: FriendshipManager;
    private _groupManager: GroupManager;
    private _timbaseManager: TimbaseManager;

    constructor(config: initConfig) {
        this._sdkconfig.sdkappid = config.sdkappid;
        this._advanceMessageManager = new AdvanceMessageManage(this._sdkconfig);
        this._conversationManager = new ConversationManager(this._sdkconfig);
        this._friendshipManager = new FriendshipManager(this._sdkconfig);
        this._groupManager = new GroupManager(this._sdkconfig);
        this._timbaseManager = new TimbaseManager(this._sdkconfig);
    }
    getTimbaseManager() {
        return this._timbaseManager;
    }
    getAdvanceMessageManager() {
        return this._advanceMessageManager;
    }
    getConversationManager() {
        return this._conversationManager;
    }
    getFriendshipManager() {
        return this._friendshipManager;
    }
    getGroupManager() {
        return this._groupManager;
    }
}

type Arg = {
    channel: string,
    eventName: string,
    data: {}
}

export const initTim = (sdkappid: number): TIM => {
    const TIMInstane = new TIM({
        sdkappid
    });
    TIMInstane.getTimbaseManager().TIMInit();
    initSDKResolver(TIMInstane);
    return TIMInstane;
}


const getInstanceWithChannel = async (channel: string) => {
    const TIMInstance = await initSDKPromise;
    switch (channel) {
        case "groupManager":
            return TIMInstance.getGroupManager();
        case 'baseManager':
            return TIMInstance.getTimbaseManager();
    }
}

export const subscribe = () => {
    ipcMain.on("call-method", (event, arg: Arg) => {
        const { eventName, data, channel } = arg;
        const instanceByChannel: any = getInstanceWithChannel(channel);
        instanceByChannel[eventName](data).then((res: any) => {
            console.log("res", res);
        }).catch((e: any) => {
            console.log("error", e);
        });
    });
}


export const callMethodWithChannel = (channel: string) => (eventName: string, args: {}) => {
    ipcRenderer.send("call-method", {
        channel,
        eventName,
        args
    })
}

export const callGroupManager = callMethodWithChannel('groupManager');

export const callBaseManager = callMethodWithChannel('baseManager');


// export default TIM;