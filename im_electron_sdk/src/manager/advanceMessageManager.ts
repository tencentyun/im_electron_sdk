import {
    sdkconfig,
    ErrorResponse,
    MsgSendMessageParams,
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
    private _callback: Map<String, Buffer> = new Map();
    private _cache: Map<String, Map<string, cache>> = new Map();
    private tIMRecvNewMsgCallbackParams:
        | TIMRecvNewMsgCallbackParams
        | undefined;
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from(" ");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || "",
        };
    }

    getErrorResponseByCode(code: number) {
        return this.getErrorResponse({ code });
    }

    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    TIMMsgSendMessage(
        msgSendMessageParams: MsgSendMessageParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgSendMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgSendMessage")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMMsgSendMessage", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMMsgSendMessage(
                c_conv_id,
                conv_type,
                c_params,
                undefined,
                this._cache.get("TIMMsgSendMessage")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

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
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgCancelSend")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (json_params === "[]")
                        reject(
                            this.getErrorResponse({
                                code,
                                desc: "message is not found",
                            })
                        );
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgFindMessages")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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
                    const callback = jsFuncToFFIFun(
                        (code, desc, json_param, user_data) => {
                            if (code === 0) {
                                resolve({ code, desc, json_param, user_data });
                            } else
                                reject(this.getErrorResponse({ code, desc }));
                            this._cache.get("TIMMsgReportReaded")?.delete(now);
                        }
                    );
                    const cacheMap = new Map();
                    cacheMap.set(now, {
                        callback: callback,
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
                const callback = jsFuncToFFIFun(
                    (code, desc, json_param, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgReportReaded")?.delete(now);
                    }
                );
                const cacheMap = new Map();
                cacheMap.set(now, {
                    callback: callback,
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
                const callback = jsFuncToFFIFun(
                    (code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgRevoke")?.delete(now);
                    }
                );
                const cacheMap = new Map();
                cacheMap.set(now, {
                    callback: callback,
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
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgFindByMsgLocatorList")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgImportMsgList")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams): Promise<commonResponse> {
        const { conv_id, conv_type, params, user_data } = msgSaveMsgParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgSaveMsg")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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
                    const callback = jsFuncToFFIFun(
                        (code, desc, json_params, user_data) => {
                            if (code === 0) {
                                resolve({ code, desc, json_params, user_data });
                            } else
                                reject(this.getErrorResponse({ code, desc }));
                            this._cache.get("TIMMsgGetMsgList")?.delete(now);
                        }
                    );
                    const cacheMap = new Map();
                    cacheMap.set(now, {
                        callback: callback,
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
                const callback = jsFuncToFFIFun(
                    (code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgGetMsgList")?.delete(now);
                    }
                );
                const cacheMap = new Map();
                cacheMap.set(now, {
                    callback: callback,
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
                const callback = jsFuncToFFIFun(
                    (code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgDelete")?.delete(now);
                    }
                );
                const cacheMap = new Map();
                cacheMap.set(now, {
                    callback: callback,
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
                const c_json_msg_param_array = this.stringFormator(
                    JSON.stringify(json_msg_param_array)
                );
                const callback = jsFuncToFFIFun(
                    (code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                        this._cache.get("TIMMsgListDelete")?.delete(now);
                    }
                );
                const cacheMap = new Map();
                cacheMap.set(now, {
                    callback: callback,
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

    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ): Promise<commonResponse> {
        const { conv_id, conv_type, user_data } = msgClearHistoryMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgClearHistoryMessage")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { params, opt, user_data } = msgSetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMMsgSetC2CReceiveMessageOpt")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgGetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMMsgGetC2CReceiveMessageOpt")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ): Promise<commonResponse> {
        const { group_id, opt, user_data } = msgSetGroupReceiveMessageOptParams;
        const c_group_id = this.stringFormator(group_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMMsgSetGroupReceiveMessageOpt")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ): Promise<commonResponse> {
        const { params, path, user_data } = msgDownloadElemToPathParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_path = this.stringFormator(path);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgDownloadElemToPath")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgDownloadMergerMessageParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgDownloadMergerMessage")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgBatchSend(
        msgBatchSendParams: MsgBatchSendParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgBatchSendParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgBatchSend")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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

    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ): Promise<commonResponse> {
        const { params, user_data } = msgSearchLocalMessagesParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMMsgSearchLocalMessages")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
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
    TIMAddRecvNewMsgCallback(params: TIMRecvNewMsgCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                callback(json_msg_array.toString(), user_data.toString());
            }
        );
        this._callback.set("TIMAddRecvNewMsgCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMAddRecvNewMsgCallback(
            this._callback.get("TIMAddRecvNewMsgCallback") as Buffer,
            c_user_data
        );
        // this.tIMRecvNewMsgCallbackParams = c_callback;
    }

    TIMRemoveRecvNewMsgCallback(): void {
        this._sdkconfig.Imsdklib.TIMRemoveRecvNewMsgCallback(
            this._callback.get("TIMAddRecvNewMsgCallback") as Buffer
        );
        // this.tIMRecvNewMsgCallbackParams = undefined;
    }

    TIMSetMsgReadedReceiptCallback(
        params: TIMMsgReadedReceiptCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_msg_readed_receipt_array: Buffer,
                user_data: Buffer
            ) {
                callback(
                    json_msg_readed_receipt_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetMsgReadedReceiptCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgReadedReceiptCallback(
            this._callback.get("TIMSetMsgReadedReceiptCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetMsgRevokeCallback(params: TIMMsgRevokeCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_locator_array: Buffer, user_data: Buffer) {
                callback(
                    json_msg_locator_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetMsgRevokeCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgRevokeCallback(
            this._callback.get("TIMSetMsgRevokeCallback") as Buffer,
            c_user_data
        );
    }
    // native 返回的user_data为空，等修复，先兼容
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
            function (
                json_msg: Buffer,
                index: number,
                cur_size: number,
                local_size: number,
                user_data: Buffer
            ) {
                callback(json_msg.toString(), index, cur_size, local_size, "");
            }
        );
        this._callback.set("TIMSetMsgElemUploadProgressCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgElemUploadProgressCallback(
            this._callback.get("TIMSetMsgElemUploadProgressCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetMsgUpdateCallback(params: TIMMsgUpdateCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                callback(json_msg_array.toString(), user_data.toString());
            }
        );
        this._callback.set("TIMSetMsgUpdateCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetMsgUpdateCallback(
            this._callback.get("TIMSetMsgUpdateCallback") as Buffer,
            c_user_data
        );
    }
    // callback end
}
export default AdvanceMessageManage;
