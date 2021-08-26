import {
    sdkconfig,
    ErrorResponse,
    MsgSendMessageParams,
    MsgSendMessageParamsV2,
    MsgCancelSendParams,
    MsgFindMessagesParams,
    MsgReportReadedParams,
    MsgRevokeParams,
    MsgFindByMsgLocatorListParams,
    MsgImportMsgListParams,
    MsgSaveMsgParams,
    MsgGetMsgListParams,
    MsgDeleteParams,
    MsgListDeleteParams,
    MsgClearHistoryMessageParams,
    MsgSetC2CReceiveMessageOptParams,
    MsgGetC2CReceiveMessageOptParams,
    MsgSetGroupReceiveMessageOptParams,
    MsgDownloadElemToPathParams,
    MsgDownloadMergerMessageParams,
    MsgBatchSendParams,
    MsgSearchLocalMessagesParams,
    commonResponse,
    cache,
    CommonCallbackFuns,
} from "../interface";
import {
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
} from "../interface/advanceMessageInterface";
import {
    nodeStrigToCString,
    jsFuncToFFIFun,
    randomString,
} from "../utils/utils";
const ffi = require("ffi-napi");
const ref = require("ref-napi");

class AdvanceMessageManage {
    private _sdkconfig: sdkconfig;
    private _callback: Map<string, Function> = new Map();
    private _cache: Map<string, Map<string, cache>> = new Map();
    private tIMRecvNewMsgCallbackParams:
        | TIMRecvNewMsgCallbackParams
        | undefined;
    private _ffiCallback: Map<string, Buffer> = new Map();
    private _uploadProcessMap: Map<string, Map<string, boolean>> = new Map();
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from(" ");

    private getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || "",
        };
    }

    private getErrorResponseByCode(code: number) {
        return this.getErrorResponse({ code });
    }

    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * ### 发送新消息，单聊消息和群消息的发送均采用此接口。
     * @param msgSendMessageParams
     * @return  {Promise} Promise的response返回值为：{ code, desc, json_params, user_data }
     * * @note
     * >  发送新消息，单聊消息和群消息的发送均采用此接口。
     * >> 发送单聊消息时 conv_id 为对方的UserID， conv_type 为 kTIMConv_C2C
     * >> 发送群聊消息时 conv_id 为群ID， conv_type 为 kTIMConv_Group 。
     * >  发送消息时不能发送 kTIMElem_GroupTips 、 kTIMElem_GroupReport ，他们由为后台下发，用于更新(通知)群的信息。可以的发送消息内元素
     * >>   文本消息元素，请参考 [TextElem](TIMCloudDef.h)
     * >>   表情消息元素，请参考 [FaceElem](TIMCloudDef.h)
     * >>   位置消息元素，请参考 [LocationElem](TIMCloudDef.h)
     * >>   图片消息元素，请参考 [ImageElem](TIMCloudDef.h)
     * >>   声音消息元素，请参考 [SoundElem](TIMCloudDef.h)
     * >>   自定义消息元素，请参考 [CustomElem](TIMCloudDef.h)
     * >>   文件消息元素，请参考 [FileElem](TIMCloudDef.h)
     * >>   视频消息元素，请参考 [VideoElem](TIMCloudDef.h)
     */
    TIMMsgSendMessage(
        msgSendMessageParams: MsgSendMessageParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data, messageId } =
            msgSendMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);
        const message_id_buffer = this.stringFormator(messageId);

        console.log("=======message_id_buffer============", message_id_buffer);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgSendMessage")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSendMessage");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMMsgSendMessage", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSendMessage(
                c_conv_id,
                conv_type,
                c_params,
                message_id_buffer,
                this._cache.get("TIMMsgSendMessage")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### 发送新消息，单聊消息和群消息的发送均采用此V2接口（返回值与TIMMsgSendMessage不同）
     * @param msgSendMessageParams
     * @return  {Promise} Promise的response返回值为：message_id(消息ID)
     * @note 与TIMMsgSendMessage不同的是他的返回值不一样并且增加了callback参数
     */
    TIMMsgSendMessageV2(msgSendMessageParams: MsgSendMessageParamsV2) {
        const { conv_id, conv_type, params, user_data, messageId, callback } =
            msgSendMessageParams;
        console.log("===============callback params===============", callback);
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);
        const message_id_buffer = new Buffer(128);
        this._callback.set("TIMMsgSendMessageV2Callback", callback);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                const fn = this._callback.get("TIMMsgSendMessageV2Callback");
                console.log("========executed callback func============", fn);
                if (code === 0)
                    fn && fn({ code, desc, json_params, user_data }, user_data);
                else fn && fn(this.getErrorResponse({ code, desc }), user_data);
                this._cache.get("TIMMsgSendMessageV2Callback")?.delete(now);
            };
            const c_callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSendMessageV2Callback");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: c_callback,
            });
            this._cache.set("TIMMsgSendMessageV2Callback", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSendMessage(
                c_conv_id,
                conv_type,
                c_params,
                message_id_buffer,
                this._cache.get("TIMMsgSendMessageV2Callback")?.get(now)
                    ?.callback,
                c_user_data
            );

            if (code === 0) {
                const message_id = message_id_buffer
                    .toString()
                    .split("\u0000")[0];
                resolve(message_id);
            } else {
                reject(this.getErrorResponse({ code }));
            }
        });
    }

    /**
     * ### 根据消息 messageID 取消发送中的消息
     * @param msgCancelSendParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgCancelSend(
        msgCancelSendParams: MsgCancelSendParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, message_id, user_data } =
            msgCancelSendParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_message_id = this.stringFormator(message_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgCancelSend")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgCancelSend");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgCancelSend", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgCancelSend(
                c_conv_id,
                conv_type,
                c_message_id,
                this._cache.get("TIMMsgCancelSend")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 根据消息 messageID 查询本地的消息列表
     * @param MsgFindMessagesParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgFindMessages(
        msgFindMessagesParams: MsgFindMessagesParams
    ): Promise<commonResponse> {
        const { json_message_id_array, user_data } = msgFindMessagesParams;
        const c_json_message_id_array = this.stringFormator(
            JSON.stringify(json_message_id_array)
        );
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (json_params === "[]")
                    reject(
                        this.getErrorResponse({
                            code,
                            desc: "message is not found",
                        })
                    );
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgFindMessages")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgFindMessages");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgFindMessages", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgFindMessages(
                c_json_message_id_array,
                this._cache.get("TIMMsgFindMessages")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 消息上报已读
     * @param MsgReportReadedParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_param, user_data }
     */
    TIMMsgReportReaded(
        msgReportReadedParams: MsgReportReadedParams
    ): Promise<commonResponse> {
        const {
            conv_id,
            conv_type,
            message_id = "",
            user_data,
        } = msgReportReadedParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        if (message_id) {
            return this.TIMMsgFindMessages({
                json_message_id_array: [message_id],
                user_data: user_data,
            }).then(res => {
                return new Promise((resolve, reject) => {
                    const now = `${Date.now()}${randomString()}`;
                    const json_msg_param_array = res.json_params;
                    const json_msg_param = JSON.stringify(
                        JSON.parse(
                            json_msg_param_array || JSON.stringify([])
                        )[0]
                    );
                    const c_json_msg_param =
                        this.stringFormator(json_msg_param);
                    const cb: CommonCallbackFuns = (
                        code,
                        desc,
                        json_param,
                        user_data
                    ) => {
                        if (code === 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgReportReaded")?.delete(now);
                    };
                    const callback = jsFuncToFFIFun(cb);
                    let cacheMap = this._cache.get("TIMMsgReportReaded");
                    if (cacheMap === undefined) {
                        cacheMap = new Map();
                    }
                    cacheMap.set(now, {
                        cb,
                        callback,
                    });
                    this._cache.set("TIMMsgReportReaded", cacheMap);
                    const code = this._sdkconfig.Imsdklib.TIMMsgReportReaded(
                        c_conv_id,
                        conv_type,
                        c_json_msg_param,
                        this._cache.get("TIMMsgReportReaded")?.get(now)
                            ?.callback,
                        c_user_data
                    );

                    code !== 0 && reject(this.getErrorResponse({ code }));
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                const now = `${Date.now()}${randomString()}`;
                const json_msg_param = "";
                const c_json_msg_param = this.stringFormator(json_msg_param);
                const cb: CommonCallbackFuns = (
                    code,
                    desc,
                    json_param,
                    user_data
                ) => {
                    if (code === 0) {
                        resolve({ code, desc, json_param, user_data });
                    } else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgReportReaded")?.delete(now);
                };
                const callback = jsFuncToFFIFun(cb);
                let cacheMap = this._cache.get("TIMMsgReportReaded");
                if (cacheMap === undefined) {
                    cacheMap = new Map();
                }
                cacheMap.set(now, {
                    cb,
                    callback,
                });
                this._cache.set("TIMMsgReportReaded", cacheMap);
                const code = this._sdkconfig.Imsdklib.TIMMsgReportReaded(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param,
                    this._cache.get("TIMMsgReportReaded")?.get(now)?.callback,
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        }
    }

    /**
     * ### 消息撤回
     * @param MsgRevokeParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 消息撤回。使用保存的消息Json或者用消息定位符查找到的消息Json，避免重复构造消息Json.
     */
    TIMMsgRevoke(msgRevokeParams: MsgRevokeParams): Promise<commonResponse> {
        const { conv_id, conv_type, message_id, user_data } = msgRevokeParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: [message_id],
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const now = `${Date.now()}${randomString()}`;
                const json_msg_param_array = res.json_params;
                const json_msg_param = JSON.stringify(
                    JSON.parse(json_msg_param_array || JSON.stringify([]))[0]
                );
                const c_json_msg_param = this.stringFormator(json_msg_param);
                const cb: CommonCallbackFuns = (
                    code,
                    desc,
                    json_params,
                    user_data
                ) => {
                    if (code === 0) {
                        resolve({ code, desc, json_params, user_data });
                    } else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgRevoke")?.delete(now);
                };
                const callback = jsFuncToFFIFun(cb);
                let cacheMap = this._cache.get("TIMMsgRevoke");
                if (cacheMap === undefined) {
                    cacheMap = new Map();
                }
                cacheMap.set(now, {
                    cb,
                    callback,
                });
                this._cache.set("TIMMsgRevoke", cacheMap);
                const code = this._sdkconfig.Imsdklib.TIMMsgRevoke(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param,
                    this._cache.get("TIMMsgRevoke")?.get(now)?.callback,
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    /**
     * ### 根据消息定位精准查找指定会话的消息
     * @param MsgFindByMsgLocatorListParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_param, user_data }
     * * @note
     * > 此接口根据消息定位符精准查找指定会话的消息，该功能一般用于消息撤回时查找指定消息等
     * > 一个消息定位符对应一条消息
     */
    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } =
            msgFindByMsgLocatorListParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgFindByMsgLocatorList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgFindByMsgLocatorList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgFindByMsgLocatorList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgFindByMsgLocatorList(
                c_conv_id,
                conv_type,
                c_params,
                this._cache.get("TIMMsgFindByMsgLocatorList")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 导入消息列表到指定会话
     * @param MsgImportMsgListParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 批量导入消息，可以自己构造消息去导入。也可以将之前要导入的消息数组Json保存，然后导入的时候直接调用接口，避免构造消息数组
     */
    TIMMsgImportMsgList(
        msgImportMsgListParams: MsgImportMsgListParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } =
            msgImportMsgListParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgImportMsgList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgImportMsgList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgImportMsgList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgImportMsgList(
                c_conv_id,
                conv_type,
                c_params,
                this._cache.get("TIMMsgImportMsgList")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 保存自定义消息
     * @param MsgSaveMsgParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 消息保存接口，一般是自己构造一个消息Json字符串，然后保存到指定会话
     */
    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgSaveMsgParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgSaveMsg")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSaveMsg");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgSaveMsg", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSaveMsg(
                c_conv_id,
                conv_type,
                c_params,
                this._cache.get("TIMMsgSaveMsg")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 获取指定会话的消息列表
     * @param MsgGetMsgListParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data}
     */
    // TODO 这个需要大量校对
    TIMMsgGetMsgList(
        msgGetMsgListParams: MsgGetMsgListParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgGetMsgListParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        if (params.msg_getmsglist_param_last_msg) {
            return this.TIMMsgFindMessages({
                json_message_id_array: [params.msg_getmsglist_param_last_msg],
                user_data: user_data,
            }).then(res => {
                return new Promise((resolve, reject) => {
                    const now = `${Date.now()}${randomString()}`;
                    const json_msg_param_array = res.json_params;
                    params.msg_getmsglist_param_last_msg = JSON.parse(
                        json_msg_param_array || JSON.stringify([])
                    )[0];
                    const c_params = this.stringFormator(
                        JSON.stringify(params)
                    );
                    const cb: CommonCallbackFuns = (
                        code,
                        desc,
                        json_params,
                        user_data
                    ) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgGetMsgList")?.delete(now);
                    };
                    const callback = jsFuncToFFIFun(cb);
                    let cacheMap = this._cache.get("TIMMsgGetMsgList");
                    if (cacheMap === undefined) {
                        cacheMap = new Map();
                    }
                    cacheMap.set(now, {
                        cb,
                        callback,
                    });
                    this._cache.set("TIMMsgGetMsgList", cacheMap);
                    const code = this._sdkconfig.Imsdklib.TIMMsgGetMsgList(
                        c_conv_id,
                        conv_type,
                        c_params,
                        this._cache.get("TIMMsgGetMsgList")?.get(now)?.callback,
                        c_user_data
                    );

                    code !== 0 && reject(this.getErrorResponse({ code }));
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                const now = `${Date.now()}${randomString()}`;
                const c_params = this.stringFormator(JSON.stringify(params));
                const cb: CommonCallbackFuns = (
                    code,
                    desc,
                    json_params,
                    user_data
                ) => {
                    if (code === 0) {
                        resolve({ code, desc, json_params, user_data });
                    } else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgGetMsgList")?.delete(now);
                };
                const callback = jsFuncToFFIFun(cb);
                let cacheMap = this._cache.get("TIMMsgGetMsgList");
                if (cacheMap === undefined) {
                    cacheMap = new Map();
                }
                cacheMap.set(now, {
                    cb,
                    callback,
                });
                this._cache.set("TIMMsgGetMsgList", cacheMap);
                const code = this._sdkconfig.Imsdklib.TIMMsgGetMsgList(
                    c_conv_id,
                    conv_type,
                    c_params,
                    this._cache.get("TIMMsgGetMsgList")?.get(now)?.callback,
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        }
    }

    /**
     * ### 获取指定会话的消息列表
     * @param MsgGetMsgListParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     *  @note
     * 本接口会在删除本地消息的同时也会删除漫游消息。需要注意以下几点：
     * > 建议将之前的消息数组Json保存，然后删除的时候直接调用接口，避免构造消息数组。
     * > 一次最多只能删除 30 条消息。
     * > 一秒钟最多只能调用一次该接口。
     * > 如果该账号在其他设备上拉取过这些消息，那么调用该接口删除后，这些消息仍然会保存在那些设备上，即删除消息不支持多端同步。
     */
    TIMMsgDelete(msgDeleteParams: MsgDeleteParams): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgDeleteParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: [params.msg_delete_param_msg],
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const now = `${Date.now()}${randomString()}`;
                const json_msg_param_array = res.json_params;
                const json_msg_param = JSON.parse(
                    json_msg_param_array || JSON.stringify([])
                )[0];
                const param = {
                    msg_delete_param_msg: json_msg_param,
                    msg_delete_param_is_remble:
                        params.msg_delete_param_is_remble,
                };
                const c_param = this.stringFormator(JSON.stringify(param));
                const cb: CommonCallbackFuns = (
                    code,
                    desc,
                    json_params,
                    user_data
                ) => {
                    if (code === 0) {
                        resolve({ code, desc, json_params, user_data });
                    } else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgDelete")?.delete(now);
                };
                const callback = jsFuncToFFIFun(cb);
                let cacheMap = this._cache.get("TIMMsgDelete");
                if (cacheMap === undefined) {
                    cacheMap = new Map();
                }
                cacheMap.set(now, {
                    cb,
                    callback,
                });
                this._cache.set("TIMMsgDelete", cacheMap);
                const code = this._sdkconfig.Imsdklib.TIMMsgDelete(
                    c_conv_id,
                    conv_type,
                    c_param,
                    this._cache.get("TIMMsgDelete")?.get(now)?.callback,
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    /**
     * ### 删除指定会话的本地及漫游消息
     * @param MsgListDeleteParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgListDelete(
        msgListDeleteParams: MsgListDeleteParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgListDeleteParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: params,
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const now = `${Date.now()}${randomString()}`;
                const json_msg_param_array = res.json_params;
                const c_json_msg_param_array =
                    this.stringFormator(json_msg_param_array);
                const cb: CommonCallbackFuns = (
                    code,
                    desc,
                    json_params,
                    user_data
                ) => {
                    if (code === 0) {
                        resolve({ code, desc, json_params, user_data });
                    } else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgListDelete")?.delete(now);
                };
                const callback = jsFuncToFFIFun(cb);
                let cacheMap = this._cache.get("TIMMsgListDelete");
                if (cacheMap === undefined) {
                    cacheMap = new Map();
                }
                cacheMap.set(now, {
                    cb,
                    callback,
                });
                this._cache.set("TIMMsgListDelete", cacheMap);
                const code = this._sdkconfig.Imsdklib.TIMMsgListDelete(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param_array,
                    this._cache.get("TIMMsgListDelete")?.get(now)?.callback,
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    /**
     * ### 获取指定会话的消息列表
     * @param MsgClearHistoryMessageParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     * @note
     * 本接口会在删除本地消息的同时也会删除漫游消息。需要注意以下几点：
     * > 建议将之前的消息数组Json保存，然后删除的时候直接调用接口，避免构造消息数组。
     * > 一次最多只能删除 30 条消息。
     * > 一秒钟最多只能调用一次该接口。
     * > 如果该账号在其他设备上拉取过这些消息，那么调用该接口删除后，这些消息仍然会保存在那些设备上，即删除消息不支持多端同步。
     */
    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, user_data } = msgClearHistoryMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgClearHistoryMessage")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgClearHistoryMessage");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgClearHistoryMessage", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgClearHistoryMessage(
                c_conv_id,
                conv_type,
                this._cache.get("TIMMsgClearHistoryMessage")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 设置针对某个用户的 C2C 消息接收选项（支持批量设置）
     * @param MsgSetC2CReceiveMessageOptParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     * * @note
     * > 该接口支持批量设置，您可以通过参数 userIDList 设置一批用户，但一次最大允许设置 30 个用户。
     * > 该接口调用频率被限制为1秒内最多调用5次。
     */
    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { params, opt, user_data } = msgSetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgSetC2CReceiveMessageOpt")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSetC2CReceiveMessageOpt");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgSetC2CReceiveMessageOpt", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSetC2CReceiveMessageOpt(
                c_params,
                opt,
                this._cache.get("TIMMsgSetC2CReceiveMessageOpt")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    /**
     * ### 查询针对某个用户的 C2C 消息接收选项
     * @param MsgGetC2CReceiveMessageOptParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgGetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgGetC2CReceiveMessageOpt")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgGetC2CReceiveMessageOpt");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgGetC2CReceiveMessageOpt", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgGetC2CReceiveMessageOpt(
                c_params,
                this._cache.get("TIMMsgGetC2CReceiveMessageOpt")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### MsgSetGroupReceiveMessageOptParams
     * @param MsgListDeleteParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     * @note
     * > 查询群消息的接收选项：您可以在群资料（GroupBaseInfo）中获得这个信息
     */
    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { group_id, opt, user_data } = msgSetGroupReceiveMessageOptParams;
        const c_group_id = this.stringFormator(group_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgSetGroupReceiveMessageOpt")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSetGroupReceiveMessageOpt");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgSetGroupReceiveMessageOpt", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMMsgSetGroupReceiveMessageOpt(
                    c_group_id,
                    opt,
                    this._cache.get("TIMMsgSetGroupReceiveMessageOpt")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### 下载消息内元素到指定文件路径(图片、视频、音频、文件)
     * @param MsgDownloadElemToPathParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ): Promise<commonResponse> {
        const { params, path, user_data } = msgDownloadElemToPathParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_path = this.stringFormator(path);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgDownloadElemToPath")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgDownloadElemToPath");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgDownloadElemToPath", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadElemToPath(
                c_params,
                c_path,
                this._cache.get("TIMMsgDownloadElemToPath")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### 下载合并消息
     * @param MsgDownloadMergerMessageParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgDownloadMergerMessageParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);
        console.log(`|         ${params}    |`, c_params);
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgDownloadMergerMessage")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgDownloadMergerMessage");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgDownloadMergerMessage", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadMergerMessage(
                c_params,
                this._cache.get("TIMMsgDownloadMergerMessage")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### 群发消息，该接口不支持向群组发送消息。
     * @param MsgBatchSendParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgBatchSend(
        msgBatchSendParams: MsgBatchSendParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgBatchSendParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgBatchSend")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgBatchSend");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgBatchSend", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgBatchSend(
                c_params,
                this._cache.get("TIMMsgBatchSend")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    /**
     * ### 搜索本地消息
     * @param MsgSearchLocalMessagesParams
     * @return {Promise} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgSearchLocalMessagesParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMMsgSearchLocalMessages")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMMsgSearchLocalMessages");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMMsgSearchLocalMessages", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSearchLocalMessages(
                c_params,
                this._cache.get("TIMMsgSearchLocalMessages")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    // callback begin

    private recvNewMsgCallback(json_msg_array: Buffer, user_data: Buffer) {
        const fn = this._callback.get("TIMAddRecvNewMsgCallback");
        fn && fn(json_msg_array, user_data);
    }

    private msgReadedReceiptCallback(
        json_msg_readed_receipt_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetMsgReadedReceiptCallback");
        fn && fn(json_msg_readed_receipt_array, user_data);
    }
    private msgRevokeCallback(
        json_msg_locator_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetMsgRevokeCallback");
        fn && fn(json_msg_locator_array, user_data);
    }
    private msgElemUploadProgressCallback(
        json_msg: Buffer,
        index: number,
        cur_size: number,
        local_size: number,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetMsgElemUploadProgressCallback");
        // try {
        //     const { message_msg_id } = JSON.parse(json_msg.toString());
        //     const now = (Date.now() / 1000).toFixed(0);
        //     if (!this._uploadProcessMap.get(message_msg_id)) {
        //         const lastCallbackTime = new Map();
        //         lastCallbackTime.set(now, true);
        //         this._uploadProcessMap.set(message_msg_id, lastCallbackTime);
        //         fn && fn(json_msg, index, cur_size, local_size, user_data);
        //     } else {
        //         const hasCallback = this._uploadProcessMap
        //             .get(message_msg_id)
        //             ?.get(now);
        //         if (!hasCallback) {
        //             this._uploadProcessMap.get(message_msg_id)?.set(now, true);
        //             fn && fn(json_msg, index, cur_size, local_size, user_data);
        //         }
        //     }
        //     if (cur_size === local_size) {
        //         this._uploadProcessMap.delete(message_msg_id);
        //     }
        // } catch (e) {
        //     fn && fn(json_msg, index, cur_size, local_size, user_data);
        // }
        fn && fn(json_msg, index, cur_size, local_size, user_data);
        // console.log('native 回调了 sdk cur_size', cur_size)
    }

    private msgUpdateCallback(json_msg_array: Buffer, user_data: Buffer) {
        const fn = this._callback.get("TIMSetMsgUpdateCallback");
        fn && fn(json_msg_array, user_data);
    }
    /**
     * ### 事件回调接口
     * @param TIMRecvNewMsgCallbackParams
     *  @note
     * 如果用户是登录状态，ImSDK收到新消息会通过此接口设置的回调抛出，另外需要注意，抛出的消息不一定是未读的消息，
     * 只是本地曾经没有过的消息（例如在另外一个终端已读，拉取最近联系人消息时可以获取会话最后一条消息，如果本地没有，会通过此方法抛出）。
     * 在用户登录之后，ImSDK会拉取离线消息，为了不漏掉消息通知，需要在登录之前注册新消息通知。
     */
    TIMAddRecvNewMsgCallback(params: TIMRecvNewMsgCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.recvNewMsgCallback.bind(this)
        );
        this._ffiCallback.set("TIMAddRecvNewMsgCallback", c_callback);
        this._callback.set("TIMAddRecvNewMsgCallback", callback);
        this._sdkconfig.Imsdklib.TIMAddRecvNewMsgCallback(
            this._ffiCallback.get("TIMAddRecvNewMsgCallback"),
            c_user_data
        );
        // this.tIMRecvNewMsgCallbackParams = c_callback;
    }
    /**
     * ### 删除接收新消息回调
     */
    TIMRemoveRecvNewMsgCallback(): void {
        this._sdkconfig.Imsdklib.TIMRemoveRecvNewMsgCallback(
            this._ffiCallback.get("TIMAddRecvNewMsgCallback")
        );
        // this.tIMRecvNewMsgCallbackParams = undefined;
    }
    /**
     * ### 设置消息已读回执回调
     * @param TIMMsgReadedReceiptCallbackParams
     */
    TIMSetMsgReadedReceiptCallback(
        params: TIMMsgReadedReceiptCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.msgReadedReceiptCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetMsgReadedReceiptCallback", c_callback);
        this._callback.set("TIMSetMsgReadedReceiptCallback", callback);
        this._sdkconfig.Imsdklib.TIMSetMsgReadedReceiptCallback(
            this._ffiCallback.get("TIMSetMsgReadedReceiptCallback"),
            c_user_data
        );
    }
    /**
     * ### 设置接收的消息被撤回回调
     * @param TIMMsgRevokeCallbackParams
     */
    TIMSetMsgRevokeCallback(params: TIMMsgRevokeCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.msgRevokeCallback.bind(this)
        );
        this._callback.set("TIMSetMsgRevokeCallback", callback);
        this._ffiCallback.set("TIMSetMsgRevokeCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgRevokeCallback(
            this._ffiCallback.get("TIMSetMsgRevokeCallback"),
            c_user_data
        );
    }
    /**
     * ### 设置消息内元素相关文件上传进度回调
     * @param TIMMsgElemUploadProgressCallbackParams
     * @note
     * 设置消息元素上传进度回调。当消息内包含图片、声音、文件、视频元素时，ImSDK会上传这些文件，并触发此接口设置的回调，用户可以根据回调感知上传的进度
     */
    //TODO native 返回的user_data为空，等修复，先兼容
    TIMSetMsgElemUploadProgressCallback(
        params: TIMMsgElemUploadProgressCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [
                ref.types.CString,
                ref.types.int,
                ref.types.int,
                ref.types.int,
                ref.types.CString,
            ],
            this.msgElemUploadProgressCallback.bind(this)
        );
        this._callback.set("TIMSetMsgElemUploadProgressCallback", callback);
        this._ffiCallback.set(
            "TIMSetMsgElemUploadProgressCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetMsgElemUploadProgressCallback(
            this._ffiCallback.get("TIMSetMsgElemUploadProgressCallback"),
            c_user_data
        );
    }
    /**
     * ### 设置消息在云端被修改后回传回来的消息更新通知回调
     * @param TIMMsgUpdateCallbackParams
     *
     *  @note
     * > 当您发送的消息在服务端被修改后，ImSDK会通过该回调通知给您
     * > 您可以在您自己的服务器上拦截所有即时通信IM消息 [发单聊消息之前回调](https://cloud.tencent.com/document/product/269/1632)
     * > 设置成功之后，即时通信IM服务器会将您的用户发送的每条消息都同步地通知给您的业务服务器。
     * > 您的业务服务器可以对该条消息进行修改（例如过滤敏感词），如果您的服务器对消息进行了修改，ImSDK就会通过此回调通知您。
     */
    TIMSetMsgUpdateCallback(params: TIMMsgUpdateCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.msgUpdateCallback.bind(this)
        );
        this._callback.set("TIMSetMsgUpdateCallback", callback);
        this._ffiCallback.set("TIMSetMsgUpdateCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgUpdateCallback(
            this._ffiCallback.get("TIMSetMsgUpdateCallback"),
            c_user_data
        );
    }
    // callback end
}
export default AdvanceMessageManage;
