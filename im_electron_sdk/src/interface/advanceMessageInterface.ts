import { GroupMemberInfo } from "./groupInterface";
import { TIMPlatform, TIMMsgStatus } from "../enum";

declare interface MsgSendMessageParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
}
interface MsgCancelSendParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}
interface MsgFindMessagesParams {
    json_message_id_array: string[];
    user_data?: string;
}
interface MsgReportReadedParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}
interface MsgRevokeParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}
interface MsgFindByMsgLocatorListParams {
    conv_id: string;
    conv_type: number;
    params: Json_msg_locator[];
    user_data?: string;
}
interface MsgImportMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg[];
    user_data?: string;
}
interface MsgSaveMsgParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
}
interface MsgGetMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_get_msg_param;
    user_data?: string;
}
interface MsgDeleteParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msgdelete;
    user_data?: string;
}
interface MsgListDeleteParams {
    conv_id: string;
    conv_type: number;
    params: string[];
    user_data?: string;
}
interface MsgClearHistoryMessageParams {
    conv_id: string;
    conv_type: number;
    user_data?: string;
}
interface MsgSetC2CReceiveMessageOptParams {
    params: string[];
    opt: number;
    user_data?: string;
}
interface MsgGetC2CReceiveMessageOptParams {
    params: string[];
    user_data?: string;
}
interface MsgSetGroupReceiveMessageOptParams {
    group_id: string;
    opt: number;
    user_data?: string;
}
interface MsgDownloadElemToPathParams {
    params: Json_download_elem_param;
    path: string;
    user_data?: string;
}
interface MsgDownloadMergerMessageParams {
    params: Json_value_msg;
    user_data?: string;
}
interface MsgBatchSendParams {
    params: {
        msg_batch_send_param_identifier_array: string[];
        msg_batch_send_param_msg: Json_value_msg;
    };
    user_data?: string;
}
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

interface TIMRecvNewMsgCallback {
    (json_msg_array: string, user_data: string): void;
}
interface TIMMsgReadedReceiptCallback {
    (json_msg_readed_receipt_array: string, user_data: string): void;
}
interface TIMMsgRevokeCallback {
    (json_msg_locator_array: string, user_data: string): void;
}
interface TIMMsgElemUploadProgressCallback {
    (
        json_msg: string,
        index: number,
        cur_size: number,
        local_size: number,
        user_data: string
    ): void;
}
interface TIMMsgUpdateCallback {
    (json_msg_array: string, user_data: string): void;
}

interface Elem {}

export {
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
    TIMRecvNewMsgCallback,
    TIMMsgReadedReceiptCallback,
    TIMMsgRevokeCallback,
    TIMMsgElemUploadProgressCallback,
    TIMMsgUpdateCallback,
};
