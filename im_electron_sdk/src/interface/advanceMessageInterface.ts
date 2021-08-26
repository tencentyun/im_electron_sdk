import { GroupMemberInfo } from "./groupInterface";
import { TIMPlatform, TIMMsgStatus, TIMReceiveMessageOpt } from "../enum";

/**
 * * @param conv_id  conv_id 会话的ID
 * @param conv_type  conv_type会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_msg_param  json_msg_param 消息json字符串
 * @param message_id  message_id 消息 ID ，调用接口后，可以读取到以 '\0' 结尾的字符串，分配内存大小不能低于 128 字节，如果不需要，可传入 nullptr
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数 result_cb，不做任何处理
 */
declare interface MsgSendMessageParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
    messageId?: string;
}
/**
  @param conv_id   conv_id 会话的ID
* @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
* @param json_msg_param json_msg_param 消息json字符串
* @param message_id  message_id 消息 ID ，调用接口后，可以读取到以 '\0' 结尾的字符串，分配内存大小不能低于 128 字节，如果不需要，可传入 nullptr
* @param callback  callback 发送新消息成功与否的回调。
* @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数 result_cb，不做任何处理
 */
interface MsgSendMessageParamsV2 {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
    messageId?: string;
    callback: Function;
}
/**
 * @param {string} conv_id      conv_id 会话ID
 * @param {number} conv_type    conv_type 会话类型
 * @param {string} message_id   message_id 消息 ID
 * @param {string} [user_data]  user_data 户自定义数据，ImSDK只负责传回给回调函数，不做任何处理(可选)
 */
interface MsgCancelSendParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}

/**
 * @param {array} json_message_id_array  json_message_id_array 消息ID列表
 * @param {string} [user_data]  user_data 户自定义数据，ImSDK只负责传回给回调函数，不做任何处理(可选)
 *  */
interface MsgFindMessagesParams {
    json_message_id_array: string[];
    user_data?: string;
}

/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type conv_type  会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_msg_param   json_msg_param 消息json字符串
 * @param cb  cb 消息上报已读成功与否的回调。回调函数定义请参考 [TIMCommCallback](TIMCloudCallback.h)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *  */
interface MsgReportReadedParams {
    conv_id: string;
    conv_type: number;
    message_id?: string;
    user_data?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_msg_param json_msg_param 消息json字符串
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理（可选）
 */
interface MsgRevokeParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_msg_Locator_array json_msg_Locator_array 消息定位符数组
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgFindByMsgLocatorListParams {
    conv_id: string;
    conv_type: number;
    params: Json_msg_locator[];
    user_data?: string;
}
/**
* @param conv_id  conv_id 会话的ID
* @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
* @param json_msg_array json_msg_array 消息数组
* @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 
*/
interface MsgImportMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg[];
    user_data?: string;
}
/**
 * @param conv_id  conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_get_msg_param  json_get_msg_param 消息获取参数
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理（可选）
 */
interface MsgSaveMsgParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
}
/**
 *    获取指定会话的消息列表
 * @param conv_id  conv_id  会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_get_msg_param  json_get_msg_param 消息获取参数
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface MsgGetMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_get_msg_param;
    user_data?: string;
}
/**
 删除指定会话的本地消息
* @param conv_id  conv_id 会话的ID
* @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
* @param json_msgdel_param json_msgdel_param 消息获取参数
* @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
* @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
*/
interface MsgDeleteParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msgdelete;
    user_data?: string;
}
/**
 * @param conv_id  conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param json_msg_array  json_msg_array 消息数组
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgListDeleteParams {
    conv_id: string;
    conv_type: number;
    params: string[];
    user_data?: string;
}
/**
 * @param conv_id conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 */
interface MsgClearHistoryMessageParams {
    conv_id: string;
    conv_type: number;
    user_data?: string;
}
/**
 * @param json_identifier_array  json_identifier_array 用户 ID 列表
 * @param opt opt 消息接收选项，请参考[TIMReceiveMessageOpt](TIMCloudDef.h)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 */
interface MsgSetC2CReceiveMessageOptParams {
    params: string[];
    opt: number;
    user_data?: string;
}

/**
 * @param json_identifier_array json_identifier_array 用户 ID 列表
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 *
 */
interface MsgGetC2CReceiveMessageOptParams {
    params: string[];
    user_data?: string;
}

/**
 * @param group_id group_id 群 ID
 * @param opt opt 消息接收选项，请参考[TIMReceiveMessageOpt](TIMCloudDef.h)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 *
 * @note
 * > 查询群消息的接收选项：您可以在群资料（GroupBaseInfo）中获得这个信息
 */
interface MsgSetGroupReceiveMessageOptParams {
    group_id: string;
    opt: TIMReceiveMessageOpt;
    user_data?: string;
}

/**
 * @param json_download_elem_param  json_download_elem_param下载的参数Json字符串
 * @param path path 下载文件保存路径
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 *
 */
interface MsgDownloadElemToPathParams {
    params: Json_download_elem_param;
    path: string;
    user_data?: string;
}
/**
 * @param json_single_msg  json_single_msg 单条消息的 JSON 字符串，接收消息、查找消息或查询历史消息时获取到的消息
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 *
 */
interface MsgDownloadMergerMessageParams {
    params: Json_value_msg;
    user_data?: string;
}
/**
 * @param json_batch_send_param json_batch_send_param  群发消息json字符串
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgBatchSendParams {
    params: {
        msg_batch_send_param_identifier_array: string[];
        msg_batch_send_param_msg: Json_value_msg;
    };
    user_data?: string;
}
/**
 * @param json_search_message_param json_search_message_param 消息搜索参数
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](TIMCloudDef.h)
 *
 */
interface MsgSearchLocalMessagesParams {
    params: Json_search_message_param;
    user_data?: string;
}

interface Json_value_msg {
    message_elem_array?: [Elem];
    message_conv_id?: string;
    message_conv_type?: number;
    message_sender?: string;
    message_priority?: number;
    message_client_time?: number;
    message_server_time?: number;
    message_is_from_self?: boolean;
    message_platform?: TIMPlatform;
    message_is_read?: boolean;
    message_is_online_msg?: boolean;
    message_is_peer_read?: boolean;
    message_status?: TIMMsgStatus;
    message_unique_id?: number;
    message_msg_id?: string;
    message_rand?: number;
    message_seq?: number;
    message_custom_int?: number;
    message_custom_str?: string;
    message_cloud_custom_str?: string;
    message_is_excluded_from_unread_count?: boolean;
    message_group_at_user_array?: string;
    message_is_forward_message?: boolean;
    message_sender_profile?: Object;
    message_sender_group_member_info?: GroupMemberInfo;
    message_offlie_push_config?: Object;
}

interface Json_msg_locator {
    message_locator_is_revoked: boolean;
    message_locator_time: boolean;
    message_locator_seq: boolean;
    message_locator_is_self: boolean;
    message_locator_rand: boolean;
    message_locator_unique_id: boolean;
}

interface Json_download_elem_param {
    msg_download_elem_param_flag: number;
    msg_download_elem_param_type: number;
    msg_download_elem_param_id: string;
    msg_download_elem_param_business_id: number;
    msg_download_elem_param_url: string;
}

interface Json_value_msgdelete {
    msg_delete_param_msg: string;
    msg_delete_param_is_remble?: boolean;
}

interface Json_value_batchsend {
    msg_batch_send_param_identifier_array?: [string];
    msg_batch_send_param_msg?: Json_value_msg;
}

interface Json_search_message_param {
    msg_search_param_keyword_array?: [string];
    msg_search_param_message_type_array?: [string];
    msg_search_param_conv_id?: string;
    msg_search_param_conv_type?: number;
    msg_search_param_search_time_position?: number;
    msg_search_param_search_time_period?: number;
    msg_search_param_page_index?: number;
    msg_search_param_page_size?: number;
    msg_search_param_keyword_list_match_type?: number;
    msg_search_param_send_indentifier_array?: [string];
}

interface Json_get_msg_param {
    msg_getmsglist_param_last_msg?: string;
    msg_getmsglist_param_count?: string;
    msg_getmsglist_param_is_remble?: boolean;
    msg_getmsglist_param_is_forward?: boolean;
    msg_getmsglist_param_last_msg_seq?: number;
    msg_getmsglist_param_time_begin?: number;
    msg_getmsglist_param_time_period?: number;
}

/**
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @param callback TIMRecvNewMsgCallbackFunc
 */
interface TIMRecvNewMsgCallbackParams {
    callback: TIMRecvNewMsgCallbackFunc;
    user_data?: string;
}
/**
 * @param TIMMsgReadedReceiptCallbackFunc  TIMMsgReadedReceiptCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgReadedReceiptCallbackParams {
    callback: TIMMsgReadedReceiptCallbackFunc;
    user_data?: string;
}

/**
 * @param callback  TIMMsgRevokeCallbackFunc（泛型）
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgRevokeCallbackParams {
    callback: TIMMsgRevokeCallbackFunc;
    user_data?: string;
}

/**
 * @param callback TIMMsgElemUploadProgressCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgElemUploadProgressCallbackParams {
    callback: TIMMsgElemUploadProgressCallbackFunc;
    user_data?: string;
}

/**
 * @param callback TIMMsgUpdateCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgUpdateCallbackParams {
    callback: TIMMsgUpdateCallbackFunc;
    user_data?: string;
}

interface TIMRecvNewMsgCallbackFunc {
    (json_msg_array: string, user_data: string): void;
}
interface TIMMsgReadedReceiptCallbackFunc {
    (json_msg_readed_receipt_array: string, user_data: string): void;
}
interface TIMMsgRevokeCallbackFunc {
    (json_msg_locator_array: string, user_data: string): void;
}
interface TIMMsgElemUploadProgressCallbackFunc {
    (
        json_msg: string,
        index: number,
        cur_size: number,
        local_size: number,
        user_data: string
    ): void;
}
interface TIMMsgUpdateCallbackFunc {
    (json_msg_array: string, user_data: string): void;
}

interface Elem {}

export {
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
    TIMRecvNewMsgCallbackFunc,
    TIMMsgReadedReceiptCallbackFunc,
    TIMMsgRevokeCallbackFunc,
    TIMMsgElemUploadProgressCallbackFunc,
    TIMMsgUpdateCallbackFunc,
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
};
