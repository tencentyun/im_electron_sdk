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
} from "../interface";
import {
    TIMRecvNewMsgCallback,
    TIMMsgReadedReceiptCallback,
    TIMMsgRevokeCallback,
    TIMMsgElemUploadProgressCallback,
    TIMMsgUpdateCallback,
} from "../interface/advanceMessageInterface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";
const ffi = require("ffi-napi");
const ref = require("ref-napi");

class AdvanceMessageManage {
    private _sdkconfig: sdkconfig;
    private tIMRecvNewMsgCallback: TIMRecvNewMsgCallback | undefined;
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from("");

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
    ): Promise<any> {
        const { conv_id, conv_type, params, user_data } = msgSendMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgSendMessage(
                c_conv_id,
                conv_type,
                c_params,
                undefined,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgCancelSend(msgCancelSendParams: MsgCancelSendParams): Promise<any> {
        const { conv_id, conv_type, message_id, user_data } =
            msgCancelSendParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_message_id = this.stringFormator(message_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgCancelSend(
                c_conv_id,
                conv_type,
                c_message_id,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgFindMessages(
        msgFindMessagesParams: MsgFindMessagesParams
    ): Promise<any> {
        const { json_message_id_array, user_data } = msgFindMessagesParams;
        const c_json_message_id_array = this.stringFormator(
            JSON.stringify(json_message_id_array)
        );
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
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
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgFindMessages(
                c_json_message_id_array,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgReportReaded(
        msgReportReadedParams: MsgReportReadedParams
    ): Promise<any> {
        const { conv_id, conv_type, message_id, user_data } =
            msgReportReadedParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: [message_id],
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params;
                const json_msg_param = JSON.stringify(
                    JSON.parse(json_msg_param_array)[0]
                );
                const c_json_msg_param = this.stringFormator(json_msg_param);
                const code = this._sdkconfig.Imsdklib.TIMMsgReportReaded(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param,
                    jsFuncToFFIFun((code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                    }),
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    TIMMsgRevoke(msgRevokeParams: MsgRevokeParams): Promise<any> {
        const { conv_id, conv_type, message_id, user_data } = msgRevokeParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: [message_id],
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params;
                const json_msg_param = JSON.stringify(
                    JSON.parse(json_msg_param_array)[0]
                );
                const c_json_msg_param = this.stringFormator(json_msg_param);
                const code = this._sdkconfig.Imsdklib.TIMMsgRevoke(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param,
                    jsFuncToFFIFun((code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                    }),
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ): Promise<any> {
        const { conv_id, conv_type, params, user_data } =
            msgFindByMsgLocatorListParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgFindByMsgLocatorList(
                c_conv_id,
                conv_type,
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgImportMsgList(
        msgImportMsgListParams: MsgImportMsgListParams
    ): Promise<any> {
        const { conv_id, conv_type, params, user_data } =
            msgImportMsgListParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgImportMsgList(
                c_conv_id,
                conv_type,
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams): Promise<any> {
        const { conv_id, conv_type, params, user_data } = msgSaveMsgParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgSaveMsg(
                c_conv_id,
                conv_type,
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgGetMsgList(msgGetMsgListParams: MsgGetMsgListParams): Promise<any> {
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
                    const json_msg_param_array = res.json_params;
                    params.msg_getmsglist_param_last_msg =
                        JSON.parse(json_msg_param_array)[0];
                    const c_params = this.stringFormator(
                        JSON.stringify(params)
                    );

                    const code = this._sdkconfig.Imsdklib.TIMMsgGetMsgList(
                        c_conv_id,
                        conv_type,
                        c_params,
                        jsFuncToFFIFun((code, desc, json_params, user_data) => {
                            if (code === 0) {
                                resolve({ code, desc, json_params, user_data });
                            } else
                                reject(this.getErrorResponse({ code, desc }));
                        }),
                        c_user_data
                    );

                    code !== 0 && reject(this.getErrorResponse({ code }));
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                const c_params = this.stringFormator(JSON.stringify(params));
                const code = this._sdkconfig.Imsdklib.TIMMsgGetMsgList(
                    c_conv_id,
                    conv_type,
                    c_params,
                    jsFuncToFFIFun((code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                    }),
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        }
    }

    TIMMsgDelete(msgDeleteParams: MsgDeleteParams): Promise<any> {
        const { conv_id, conv_type, params, user_data } = msgDeleteParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: [params.msg_delete_param_msg],
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params;
                const json_msg_param = JSON.parse(json_msg_param_array)[0];
                const param = {
                    msg_delete_param_msg: json_msg_param,
                    msg_delete_param_is_remble:
                        params.msg_delete_param_is_remble,
                };
                const c_param = this.stringFormator(JSON.stringify(param));
                const code = this._sdkconfig.Imsdklib.TIMMsgDelete(
                    c_conv_id,
                    conv_type,
                    c_param,
                    jsFuncToFFIFun((code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                    }),
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    TIMMsgListDelete(msgListDeleteParams: MsgListDeleteParams): Promise<any> {
        const { conv_id, conv_type, params, user_data } = msgListDeleteParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return this.TIMMsgFindMessages({
            json_message_id_array: params,
            user_data: user_data,
        }).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params;
                const c_json_msg_param_array = this.stringFormator(
                    JSON.stringify(json_msg_param_array)
                );
                const code = this._sdkconfig.Imsdklib.TIMMsgListDelete(
                    c_conv_id,
                    conv_type,
                    c_json_msg_param_array,
                    jsFuncToFFIFun((code, desc, json_params, user_data) => {
                        if (code === 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else reject(this.getErrorResponse({ code, desc }));
                    }),
                    c_user_data
                );

                code !== 0 && reject(this.getErrorResponse({ code }));
            });
        });
    }

    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ): Promise<any> {
        const { conv_id, conv_type, user_data } = msgClearHistoryMessageParams;
        const c_conv_id = this.stringFormator(conv_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgClearHistoryMessage(
                c_conv_id,
                conv_type,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ): Promise<any> {
        const { params, opt, user_data } = msgSetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgSetC2CReceiveMessageOpt(
                c_params,
                opt,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ): Promise<any> {
        const { params, user_data } = msgGetC2CReceiveMessageOptParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgGetC2CReceiveMessageOpt(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ): Promise<any> {
        const { group_id, opt, user_data } = msgSetGroupReceiveMessageOptParams;
        const c_group_id = this.stringFormator(group_id);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMMsgSetGroupReceiveMessageOpt(
                    c_group_id,
                    opt,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ): Promise<any> {
        const { params, path, user_data } = msgDownloadElemToPathParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_path = this.stringFormator(path);
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadElemToPath(
                c_params,
                c_path,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ): Promise<any> {
        const { params, user_data } = msgDownloadMergerMessageParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadMergerMessage(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgBatchSend(msgBatchSendParams: MsgBatchSendParams): Promise<any> {
        const { params, user_data } = msgBatchSendParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgBatchSend(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ): Promise<any> {
        const { params, user_data } = msgSearchLocalMessagesParams;
        const c_params = this.stringFormator(JSON.stringify(params));
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMMsgSearchLocalMessages(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    // callback begin
    TIMAddRecvNewMsgCallback(
        tIMRecvNewMsgCallback: TIMRecvNewMsgCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                tIMRecvNewMsgCallback(
                    json_msg_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMAddRecvNewMsgCallback(
            callback,
            c_user_data
        );
        this.tIMRecvNewMsgCallback = callback;
    }

    TIMRemoveRecvNewMsgCallback(): void {
        this._sdkconfig.Imsdklib.TIMRemoveRecvNewMsgCallback(
            this.tIMRecvNewMsgCallback
        );
        this.tIMRecvNewMsgCallback = undefined;
    }

    TIMSetMsgReadedReceiptCallback(
        tIMMsgReadedReceiptCallback: TIMMsgReadedReceiptCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_msg_readed_receipt_array: Buffer,
                user_data: Buffer
            ) {
                tIMMsgReadedReceiptCallback(
                    json_msg_readed_receipt_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetMsgReadedReceiptCallback(
            callback,
            c_user_data
        );
    }

    TIMSetMsgRevokeCallback(
        tIMMsgRevokeCallback: TIMMsgRevokeCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_locator_array: Buffer, user_data: Buffer) {
                tIMMsgRevokeCallback(
                    json_msg_locator_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetMsgRevokeCallback(callback, c_user_data);
    }

    TIMSetMsgElemUploadProgressCallback(
        tIMMsgElemUploadProgressCallback: TIMMsgElemUploadProgressCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_msg: Buffer,
                index: number,
                cur_size: number,
                local_size: number,
                user_data: Buffer
            ) {
                tIMMsgElemUploadProgressCallback(
                    json_msg.toString(),
                    index,
                    cur_size,
                    local_size,
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetMsgElemUploadProgressCallback(
            callback,
            c_user_data
        );
    }

    TIMSetMsgUpdateCallback(
        tIMMsgUpdateCallback: TIMMsgUpdateCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                tIMMsgUpdateCallback(
                    json_msg_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetMsgUpdateCallback(callback, c_user_data);
    }
    // callback end
}
export default AdvanceMessageManage;
