export const TIMFriendshipGetFriendProfileListParams = {}
export const TIMFriendshipAddFriendParams = {
    friendship_add_friend_param_identifier: "lexuslin3",
    friendship_add_friend_param_friend_type: 1,
    friendship_add_friend_param_remark: "xxx",
    friendship_add_friend_param_group_name: "",
    friendship_add_friend_param_add_source: "Windows",
    friendship_add_friend_param_add_wording: "xxx",
}
export const TIMFriendshipHandleFriendAddRequestParams = {
    friend_respone_identifier: "lexuslin3",
    friend_respone_action: 1,
    friend_respone_remark: "xx",
    friend_respone_group_name: "xx",
}
export const TIMFriendshipModifyFriendProfileParams = {
    friendship_modify_friend_profile_param_identifier: "lexuslin3",
    friendship_modify_friend_profile_param_item: {
        friend_profile_item_remark: "xx",
        friend_profile_item_group_name_array: ["xx"],
        friend_profile_item_custom_string_array: [{
            friend_profile_custom_string_info_key: "xx",
            friend_profile_custom_string_info_value: "xx"
        }]
    }
}
export const TIMFriendshipDeleteFriendParams = {
    friendship_delete_friend_param_friend_type: 1,
    friendship_delete_friend_param_identifier_array: ["lexuslin3"]
}
export const TIMFriendshipCheckFriendTypeParams = {
    friendship_check_friendtype_param_check_type: 0,
    friendship_check_friendtype_param_identifier_array: ["lexuslin3"]
}
export const TIMFriendshipCreateFriendGroupParams = {
    friendship_create_friend_group_param_name_array: ["ggg1"],
    friendship_create_friend_group_param_identifier_array: ["lexuslin3"],
}
export const TIMFriendshipGetFriendGroupListParams = ["ggg2"]
export const TIMFriendshipModifyFriendGroupParams = {
    friendship_modify_friend_group_param_name: "ggg1",
    friendship_modify_friend_group_param_new_name: "ggg2",
    friendship_modify_friend_group_param_delete_identifier_array: ["lexuslin3"],
    friendship_modify_friend_group_param_add_identifier_array: ["lexuslin3"]
}
export const TIMFriendshipDeleteFriendGroupParams = ["ggg2"]
export const TIMFriendshipAddToBlackListParams = ["lexuslin2"]
export const TIMFriendshipGetBlackListParams = {}
export const TIMFriendshipDeleteFromBlackListParams = ["lexuslin2"]
export const TIMFriendshipGetPendencyListParams = {
    friendship_get_pendency_list_param_type: 1,
    friendship_get_pendency_list_param_start_seq: 0,
    friendship_get_pendency_list_param_start_time: 0,
    friendship_get_pendency_list_param_limited_size: 10,
}
export const TIMFriendshipDeletePendencyParams = {
    friendship_delete_pendency_param_type: 1,
    friendship_delete_pendency_param_identifier_array: ["test1"]
}
export const TIMFriendshipReportPendencyReadedParams = Math.floor(+new Date/1000)
export const TIMFriendshipSearchFriendsParams = {
    friendship_search_param_keyword_list: ["lexus"],
    friendship_search_param_search_field_list: [1, 2, 4]
}
export const TIMFriendshipGetFriendsInfoParams = ["lexuslin3"]