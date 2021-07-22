import { CommonCallbackFun, commonResponse, sdkconfig } from "../interface";
import {
    convCreate,
    convDelete,
    getConvList,
    convSetDrat,
    convCancelDraft,
    convGetConvInfo,
    convPinConversation,
    convGetTotalUnreadMessageCount,
    setConvEventCallback,
    convTotalUnreadMessageCountChangedCallbackParam,
} from "../interface/conversationInterface";
import {
    jsFuncToFFIConvEventCallback,
    jsFuncToFFIFun,
    jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback,
    nodeStrigToCString,
} from "../utils/utils";

class ConversationManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Buffer> = new Map();
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    TIMConvCreate(param: convCreate): Promise<commonResponse> {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvCreate", callback);
            const code: number = this._sdkconfig.Imsdklib.TIMConvCreate(
                convId,
                convType,
                this._callback.get("TIMConvCreate") as Buffer,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMConvDelete(param: convDelete): Promise<commonResponse> {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvDelete", callback);
            const code: number = this._sdkconfig.Imsdklib.TIMConvDelete(
                convId,
                convType,
                this._callback.get("TIMConvDelete") as Buffer,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    async TIMConvGetConvList(param: getConvList): Promise<commonResponse> {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };

            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvGetConvList", callback);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvList(
                this._callback.get("TIMConvGetConvList") as Buffer,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMConvSetDraft(param: convSetDrat): number {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const draftParam = nodeStrigToCString(JSON.stringify(param.draftParam));
        return this._sdkconfig.Imsdklib.TIMConvSetDraft(
            convId,
            convType,
            draftParam
        );
    }
    TIMConvCancelDraft(param: convCancelDraft): number {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        return this._sdkconfig.Imsdklib.TIMConvCancelDraft(convId, convType);
    }
    TIMConvGetConvInfo(param: convGetConvInfo): Promise<commonResponse> {
        const convList = nodeStrigToCString(
            JSON.stringify(param.json_get_conv_list_param)
        );
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvGetConvInfo", callback);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvInfo(
                convList,
                this._callback.get("TIMConvGetConvInfo") as Buffer,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMConvPinConversation(
        param: convPinConversation
    ): Promise<commonResponse> {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const isPinged = param.isPinned;
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvPinConversation", callback);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvPinConversation(
                    convId,
                    convType,
                    isPinged,
                    this._callback.get("TIMConvPinConversation") as Buffer,
                    userData
                );
            code !== 0 && reject({ code });
        });
    }
    TIMConvGetTotalUnreadMessageCount(
        param: convGetTotalUnreadMessageCount
    ): Promise<commonResponse> {
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            this._callback.set("TIMConvGetTotalUnreadMessageCount", callback);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvGetTotalUnreadMessageCount(
                    this._callback.get(
                        "TIMConvGetTotalUnreadMessageCount"
                    ) as Buffer,
                    userData
                );
            code !== 0 && reject({ code });
        });
    }
    async TIMSetConvEventCallback(param: setConvEventCallback): Promise<any> {
        const callback: Buffer = jsFuncToFFIConvEventCallback(param.callback);
        this._callback.set("TIMSetConvEventCallback", callback);
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        this._sdkconfig.Imsdklib.TIMSetConvEventCallback(
            this._callback.get("TIMSetConvEventCallback") as Buffer,
            userData
        );
    }
    async TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ): Promise<any> {
        const callback =
            jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback(
                param.callback
            );
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        this._callback.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            callback
        );
        this._sdkconfig.Imsdklib.TIMSetConvTotalUnreadMessageCountChangedCallback(
            this._callback.get(
                "TIMSetConvTotalUnreadMessageCountChangedCallback"
            ) as Buffer,
            userData
        );
    }
}
export default ConversationManager;
