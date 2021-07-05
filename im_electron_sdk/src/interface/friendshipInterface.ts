import { CommonCallbackFun } from "./basicInterface";
import {
    TIMFriendType,
    TIMFriendResponseAction,
    TIMFriendPendencyType,
} from "../enum";

interface Json_add_friend_param {
    friendship_add_friend_param_identifier?: string;
    friendship_add_friend_param_friend_type?: TIMFriendType;
    friendship_add_friend_param_remark?: string;
    friendship_add_friend_param_group_name?: string;
    friendship_add_friend_param_add_source?: string;
    friendship_add_friend_param_add_wording?: string;
}

interface Json_delete_friend_param {
    friendship_delete_friend_param_friend_type?: TIMFriendType;
    friendship_delete_friend_param_identifier_array?: [string];
}

interface Json_modify_friend_info_param {
    friendship_modify_friend_profile_param_identifier?: string;
    friendship_modify_friend_profile_param_item?: FriendProfileItem;
}

interface Json_check_friend_list_param {
    friendship_check_friendtype_param_check_type?: TIMFriendType;
    friendship_check_friendtype_param_identifier_array?: [string];
}

interface Json_create_friend_group_param {
    friendship_create_friend_group_param_name_array?: [string];
    friendship_create_friend_group_param_identifier_array?: [string];
}

interface FriendProfileItem {
    friend_profile_item_remark?: string;
    friend_profile_item_group_name_array?: [];
    friend_profile_item_custom_string_array?: [FriendProfileCustemStringInfo];
}

interface FriendProfileCustemStringInfo {
    friend_profile_custom_string_info_key?: string;
    friend_profile_custom_string_info_value?: string;
}

interface Json_handle_friend_add_param {
    friend_respone_identifier?: string;
    friend_respone_action?: TIMFriendResponseAction;
    friend_respone_remark?: string;
    friend_respone_group_name?: string;
}

interface Json_modify_friend_group_param {
    friendship_modify_friend_group_param_name?: string;
    friendship_modify_friend_group_param_new_name?: string;
    friendship_modify_friend_group_param_delete_identifier_array?: [string];
    friendship_modify_friend_group_param_add_identifier_array?: [string];
}

interface Json_get_pendency_list_param {
    friendship_get_pendency_list_param_type?: number;
    friendship_get_pendency_list_param_start_seq?: number;
    friendship_get_pendency_list_param_start_time?: number;
    friendship_get_pendency_list_param_limited_size?: number;
}

interface Json_delete_pendency_param {
    friendship_delete_pendency_param_type?: TIMFriendPendencyType;
    friendship_delete_pendency_param_identifier_array?: [string];
}

interface Json_search_friends_param {
    friendship_search_param_keyword_list?: [string];
    friendship_search_param_search_field_list?: [number];
}

interface ErrorResponse {
    code?: number;
    desc?: String;
    json_params?: String;
    user_data?: String;
}

interface TIMOnAddFriendCallback {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMOnDeleteFriendCallback {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMUpdateFriendProfileCallback {
    (json_friend_profile_update_array: string, user_data: string): void;
}
interface TIMFriendAddRequestCallback {
    (json_friend_add_request_pendency_array: string, user_data: string): void;
}
interface TIMFriendApplicationListDeletedCallback {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMFriendApplicationListReadCallback {
    (user_data: string): void;
}
interface TIMFriendBlackListAddedCallback {
    (json_friend_black_added_array: string, user_data: string): void;
}
interface TIMFriendBlackListDeletedCallback {
    (json_identifier_array: string, user_data: string): void;
}

export {
    ErrorResponse,
    Json_add_friend_param,
    Json_delete_friend_param,
    Json_modify_friend_info_param,
    Json_handle_friend_add_param,
    Json_check_friend_list_param,
    Json_create_friend_group_param,
    Json_modify_friend_group_param,
    Json_get_pendency_list_param,
    Json_delete_pendency_param,
    Json_search_friends_param,
    TIMOnAddFriendCallback,
    TIMOnDeleteFriendCallback,
    TIMUpdateFriendProfileCallback,
    TIMFriendAddRequestCallback,
    TIMFriendApplicationListDeletedCallback,
    TIMFriendApplicationListReadCallback,
    TIMFriendBlackListAddedCallback,
    TIMFriendBlackListDeletedCallback,
};
