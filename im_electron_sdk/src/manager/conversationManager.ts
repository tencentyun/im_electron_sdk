import {
    cache,
    CommonCallbackFun,
    commonResponse,
    sdkconfig,
} from "../interface";
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
    randomString,
} from "../utils/utils";

class ConversationManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Function> = new Map();
    private _ffiCallback: Map<String, Buffer> = new Map();
    private _cache: Map<String, Map<string, cache>> = new Map();
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMConvCreate")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvCreate");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvCreate", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvCreate(
                convId,
                convType,
                this._cache.get("TIMConvCreate")?.get(now)?.callback,
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMConvDelete")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvDelete");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvDelete", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvDelete(
                convId,
                convType,
                this._cache.get("TIMConvDelete")?.get(now)?.callback,
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMConvGetConvList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetConvList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetConvList", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvList(
                this._cache.get("TIMConvGetConvList")?.get(now)?.callback,
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMConvGetConvInfo")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetConvInfo");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetConvInfo", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvInfo(
                convList,
                this._cache.get("TIMConvGetConvInfo")?.get(now)?.callback,
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMConvPinConversation")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvPinConversation");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvPinConversation", cacheMap);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvPinConversation(
                    convId,
                    convType,
                    isPinged,
                    this._cache.get("TIMConvPinConversation")?.get(now)
                        ?.callback,
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
            const now = `${Date.now()}${randomString()}`;
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
                this._cache
                    .get("TIMConvGetTotalUnreadMessageCount")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetTotalUnreadMessageCount");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetTotalUnreadMessageCount", cacheMap);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvGetTotalUnreadMessageCount(
                    this._cache
                        .get("TIMConvGetTotalUnreadMessageCount")
                        ?.get(now)?.callback,
                    userData
                );
            code !== 0 && reject({ code });
        });
    }
    private setConvEventCallback(
        conv_event: number,
        json_conv_array: string,
        user_data: string
    ) {
        const fn = this._callback.get("TIMSetConvEventCallback");
        fn && fn(conv_event, json_conv_array, user_data);
    }
    private convTotalUnreadMessageCountChangedCallback(
        total_unread_count: number,
        user_data: string
    ) {
        const fn = this._callback.get(
            "TIMSetConvTotalUnreadMessageCountChangedCallback"
        );
        fn && fn(total_unread_count, user_data);
    }
    async TIMSetConvEventCallback(param: setConvEventCallback): Promise<any> {
        this._callback.set("TIMSetConvEventCallback", param.callback);
        const c_callback = jsFuncToFFIConvEventCallback(
            this.setConvEventCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetConvEventCallback", c_callback);
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        this._sdkconfig.Imsdklib.TIMSetConvEventCallback(
            this._ffiCallback.get("TIMSetConvEventCallback") as Buffer,
            userData
        );
    }
    async TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ): Promise<any> {
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        const c_callback =
            jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback(
                this.convTotalUnreadMessageCountChangedCallback.bind(this)
            );
        this._ffiCallback.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            c_callback
        );
        this._callback.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            param.callback
        );
        this._sdkconfig.Imsdklib.TIMSetConvTotalUnreadMessageCountChangedCallback(
            this._ffiCallback.get(
                "TIMSetConvTotalUnreadMessageCountChangedCallback"
            ) as Buffer,
            userData
        );
    }
}
export default ConversationManager;
