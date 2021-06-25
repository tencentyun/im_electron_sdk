import { CommonCallbackFun } from "./basicInterface";
import { GroupMemberInfo } from "./groupInterface";
import { TIMFriendType, TIMPlatform, TIMMsgStatus } from "../enum";

interface Json_advance_message_param {
    friendship_add_friend_param_identifier?: string;
    friendship_add_friend_param_friend_type?: TIMFriendType;
    friendship_add_friend_param_remark?: string;
    friendship_add_friend_param_group_name?: string;
    friendship_add_friend_param_add_source?: string;
    friendship_add_friend_param_add_wording?: string;
}

interface Json_value_msg {
    message_elem_array?: [Elem]
    message_conv_id?: string
    message_conv_type?: number
    message_sender?: string
    message_priority?: number
    message_client_time?: number
    message_server_time?: number
    message_is_from_self?: boolean
    message_platform?: TIMPlatform
    message_is_read?: boolean
    message_is_online_msg?: boolean
    // message_is_peer_read?: boolean
    // message_status?: TIMMsgStatus
    // message_unique_id?: number
    // message_msg_id?: string
    // message_rand?: number
    // message_seq?: number
    // message_custom_int?: number
    // message_custom_str?: string
    // message_cloud_custom_str?: string
    // message_is_excluded_from_unread_count?: boolean
    // message_group_at_user_array?: string
    // message_is_forward_message?: boolean
    // message_sender_profile?: UserProfile
    // message_sender_group_member_info?: GroupMemberInfo
    // message_offlie_push_config?: OfflinePushConfig
}

interface Json_value_msgdelete {
    msg_delete_param_msg: string
    msg_delete_param_is_remble?: boolean
}

interface Json_value_batchsend {
    msg_batch_send_param_identifier_array?: [string]
    msg_batch_send_param_msg?: Json_value_msg
}

interface Json_search_message_param {
    msg_search_param_keyword_array?: [string]
    msg_search_param_message_type_array?: [string]
    msg_search_param_conv_id?: string
    msg_search_param_conv_type?: number
    msg_search_param_search_time_position?: number
    msg_search_param_search_time_period?: number
    msg_search_param_page_index?: number
    msg_search_param_page_size?: number
}

interface TIMRecvNewMsgCallback {
    (json_msg_array: string, user_data: string): void
}
interface TIMMsgReadedReceiptCallback {
    (json_msg_readed_receipt_array: string, user_data: string): void
}
interface TIMMsgRevokeCallback {
    (json_msg_locator_array: string, user_data: string): void
}
interface TIMMsgElemUploadProgressCallback {
    (json_msg: string, index: number, cur_size: number, local_size: number, user_data: string): void
}
interface TIMMsgUpdateCallback {
    (json_msg_array: string, user_data: string): void
}

interface Elem {

}

export {
    Json_advance_message_param,
    Json_value_msg,
    Json_value_msgdelete,
    Json_value_batchsend,
    Json_search_message_param,
    TIMRecvNewMsgCallback,
    TIMMsgReadedReceiptCallback,
    TIMMsgRevokeCallback,
    TIMMsgElemUploadProgressCallback,
    TIMMsgUpdateCallback
}