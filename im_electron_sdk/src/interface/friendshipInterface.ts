import {
    TIMFriendType,
    TIMFriendResponseAction,
    TIMFriendPendencyType,
} from "../enum";

interface GetFriendProfileListParams {
    user_data?: string;
}
interface AddFriendParams {
    params: {
        friendship_add_friend_param_identifier?: string;
        friendship_add_friend_param_friend_type?: TIMFriendType;
        friendship_add_friend_param_remark?: string;
        friendship_add_friend_param_group_name?: string;
        friendship_add_friend_param_add_source?: string;
        friendship_add_friend_param_add_wording?: string;
    };
    user_data?: string;
}

interface DeleteFriendParams {
    params: {
        friendship_delete_friend_param_friend_type?: TIMFriendType;
        friendship_delete_friend_param_identifier_array?: [string];
    };
    user_data?: string;
}

interface ModifyFriendProfileParams {
    params: {
        friendship_modify_friend_profile_param_identifier?: string;
        friendship_modify_friend_profile_param_item?: FriendProfileItem;
    };
    user_data?: string;
}

interface CheckFriendTypeParams {
    params: {
        friendship_check_friendtype_param_check_type?: TIMFriendType;
        friendship_check_friendtype_param_identifier_array?: [string];
    };
    user_data?: string;
}

interface CreateFriendGroupParams {
    params: {
        friendship_create_friend_group_param_name_array?: [string];
        friendship_create_friend_group_param_identifier_array?: [string];
    };
    user_data?: string;
}

interface FriendshipStringArrayParams {
    params: string[];
    user_data?: string;
}

interface GetBlackListParams {
    user_data?: string;
}

interface HandleFriendAddParams {
    params: {
        friend_respone_identifier?: string;
        friend_respone_action?: TIMFriendResponseAction;
        friend_respone_remark?: string;
        friend_respone_group_name?: string;
    };
    user_data?: string;
}

interface ModifyFriendGroupParams {
    params: {
        friendship_modify_friend_group_param_name?: string;
        friendship_modify_friend_group_param_new_name?: string;
        friendship_modify_friend_group_param_delete_identifier_array?: [string];
        friendship_modify_friend_group_param_add_identifier_array?: [string];
    };
    user_data?: string;
}

interface FriendshipGetPendencyListParams {
    params: {
        friendship_get_pendency_list_param_type?: number;
        friendship_get_pendency_list_param_start_seq?: number;
        friendship_get_pendency_list_param_start_time?: number;
        friendship_get_pendency_list_param_limited_size?: number;
    };
    user_data?: string;
}

interface DeletePendencyParams {
    params: {
        friendship_delete_pendency_param_type?: TIMFriendPendencyType;
        friendship_delete_pendency_param_identifier_array?: [string];
    };
    user_data?: string;
}

interface ReportPendencyReadedParams {
    timestamp?: number;
    user_data?: string;
}

interface SearchFriendsParams {
    params: {
        friendship_search_param_keyword_list?: [string];
        friendship_search_param_search_field_list?: [number];
    };
    user_data?: string;
}

interface ErrorResponse {
    code?: number;
    desc?: String;
    json_params?: String;
    user_data?: String;
}

interface FriendProfileItem {
    friend_profile_item_remark?: string;
    friend_profile_item_group_name_array?: [];
    friend_profile_item_custom_string_array?: [FriendProfileCustemStringInfo];
}

interface FriendProfileCustemStringInfo {
    user_data?: string;
    friend_profile_custom_string_info_key?: string;
    friend_profile_custom_string_info_value?: string;
}
interface TIMOnAddFriendCallbackParams {
    callback: TIMOnAddFriendCallbackFunc;
    user_data?: string;
}
interface TIMOnDeleteFriendCallbackParams {
    callback: TIMOnDeleteFriendCallbackFunc;
    user_data?: string;
}
interface TIMUpdateFriendProfileCallbackParams {
    callback: TIMUpdateFriendProfileCallbackFunc;
    user_data?: string;
}
interface TIMFriendAddRequestCallbackParams {
    callback: TIMFriendAddRequestCallbackFunc;
    user_data?: string;
}
interface TIMFriendApplicationListDeletedCallbackParams {
    callback: TIMFriendApplicationListDeletedCallbackFunc;
    user_data?: string;
}
interface TIMFriendApplicationListReadCallbackParams {
    callback: TIMFriendApplicationListReadCallbackFunc;
    user_data?: string;
}
interface TIMFriendBlackListAddedCallbackParams {
    callback: TIMFriendBlackListAddedCallbackFunc;
    user_data?: string;
}
interface TIMFriendBlackListDeletedCallbackParams {
    callback: TIMFriendBlackListDeletedCallbackFunc;
    user_data?: string;
}
interface TIMOnAddFriendCallbackFunc {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMOnDeleteFriendCallbackFunc {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMUpdateFriendProfileCallbackFunc {
    (json_friend_profile_update_array: string, user_data: string): void;
}
interface TIMFriendAddRequestCallbackFunc {
    (json_friend_add_request_pendency_array: string, user_data: string): void;
}
interface TIMFriendApplicationListDeletedCallbackFunc {
    (json_identifier_array: string, user_data: string): void;
}
interface TIMFriendApplicationListReadCallbackFunc {
    (user_data: string): void;
}
interface TIMFriendBlackListAddedCallbackFunc {
    (json_friend_black_added_array: string, user_data: string): void;
}
interface TIMFriendBlackListDeletedCallbackFunc {
    (json_identifier_array: string, user_data: string): void;
}

export {
    ErrorResponse,
    GetFriendProfileListParams,
    AddFriendParams,
    DeleteFriendParams,
    ModifyFriendProfileParams,
    CheckFriendTypeParams,
    CreateFriendGroupParams,
    FriendshipStringArrayParams,
    GetBlackListParams,
    HandleFriendAddParams,
    ModifyFriendGroupParams,
    FriendshipGetPendencyListParams,
    DeletePendencyParams,
    ReportPendencyReadedParams,
    SearchFriendsParams,
    TIMOnAddFriendCallbackFunc,
    TIMOnDeleteFriendCallbackFunc,
    TIMUpdateFriendProfileCallbackFunc,
    TIMFriendAddRequestCallbackFunc,
    TIMFriendApplicationListDeletedCallbackFunc,
    TIMFriendApplicationListReadCallbackFunc,
    TIMFriendBlackListAddedCallbackFunc,
    TIMFriendBlackListDeletedCallbackFunc,
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
};
