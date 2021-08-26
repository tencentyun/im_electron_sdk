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
    /**
     * ###  创建会话
     * @param convCreate
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * > 会话是指面向一个人或者一个群组的对话，通过与单个人或群组之间会话收发消息
     * > 此接口创建或者获取会话信息，需要指定会话类型（群组或者单聊），以及会话对方标志（对方帐号或者群号）。会话信息通过cb回传。
     */
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
    /**
     * ### 删除会话
     * @param convDelete
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * 此接口用于删除会话，删除会话是否成功通过回调返回。
     */
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
    /**
     * ### 获取最近联系人的会话列表
     * @param getConvList
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * 会话草稿一般用在保存用户当前输入的未发送的消息。
     */
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
    /**
     * ### 设置指定会话的草稿
     * @param convSetDrat
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * 会话草稿一般用在保存用户当前输入的未发送的消息。
     */
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
    /**
     * ### 删除指定会话的草稿
     * @param convCancelDraft
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * > 会话是指面向一个人或者一个群组的对话，通过与单个人或群组之间会话收发消息
     * > 此接口创建或者获取会话信息，需要指定会话类型（群组或者单聊），以及会话对方标志（对方帐号或者群号）。会话信息通过cb回传。
     */
    TIMConvCancelDraft(param: convCancelDraft): number {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        return this._sdkconfig.Imsdklib.TIMConvCancelDraft(convId, convType);
    }
    /**
     * ### 获取指定会话列表
     * @param convGetConvInfo
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     *   */
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
    /**
     * ### 设置会话置顶
     * @param convCreate
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
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
    /**
     * ### 获取所有会话总的未读消息数
     * @param convGetTotalUnreadMessageCount
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
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
    /**
     * ### 设置会话事件回调
     * @param setConvEventCallback
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
    @note
    * > 会话事件包括：
    * >> 会话新增
    * >> 会话删除
    * >> 会话更新。
    * >> 会话开始
    * >> 会话结束
    * > 任何产生一个新会话的操作都会触发会话新增事件，例如调用接口[TIMConvCreate]()创建会话，接收到未知会话的第一条消息等。
    * 任何已有会话变化的操作都会触发会话更新事件，例如收到会话新消息，消息撤回，已读上报等。
    * 调用接口[TIMConvDelete]()删除会话成功时会触发会话删除事件。
    */
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
    /**
     * ### 设置会话未读消息总数变更的回调
     * @param convTotalUnreadMessageCountChangedCallbackParam
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
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
