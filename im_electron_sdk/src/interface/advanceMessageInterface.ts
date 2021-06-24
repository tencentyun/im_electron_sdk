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

interface Elem {

}

export {
    Json_advance_message_param,
    Json_value_msg
}