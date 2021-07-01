export const createGroupResult = JSON.stringify({
    create_group_param_group_name: "test group",
    create_group_param_group_id: "1111",
    create_group_param_group_type: 0,
    create_group_param_group_member_array: [
        {
            group_member_info_identifier: "1111",
            group_member_info_join_time: 1000,
            group_member_info_member_role: "test member role",
            group_member_info_msg_flag: 1,
            group_member_info_msg_seq: 2,
            group_member_info_shutup_time: 99933,
            group_member_info_name_card: "test name card",
            group_member_info_custom_info: [
                {
                    group_member_info_custom_string_info_key: "test key 1",
                    group_member_info_custom_string_info_value: "test value1",
                },
            ],
        },
    ],
    create_group_param_notification: "test notification",
    create_group_param_introduction: "use for test group",
    create_group_param_face_url: "https://xxx",
    create_group_param_add_option: 1,
    create_group_param_max_member_num: 20,
    create_group_param_custom_info: [
        {
            group_info_custom_string_info_key: "test key",
            group_info_custom_string_info_value: "test value",
        },
    ],
});

export const inviteMemberResult = JSON.stringify({
    group_invite_member_param_group_id: "111111",
    group_invite_member_param_identifier_array: ["99999"],
    group_invite_member_param_user_data: "hahah",
});

export const deleteMemberResult = JSON.stringify({
    group_delete_member_param_group_id: "111111",
    group_delete_member_param_identifier_array: ["99999"],
    group_delete_member_param_user_data: "hahah",
});

export const modifyGroupInfoResult = JSON.stringify({
    group_modify_info_param_group_id: "111111",
    group_modify_info_param_modify_flag: 0,
    group_modify_info_param_group_name: "test name",
    group_modify_info_param_notification: "test notification",
    group_modify_info_param_introduction: "test introduction",
    group_modify_info_param_face_url: "xxxx",
    group_modify_info_param_add_option: 1,
    group_modify_info_param_max_member_num: 20,
    group_modify_info_param_visible: 1,
    group_modify_info_param_searchable: 1,
    group_modify_info_param_is_shutup_all: false,
    group_modify_info_param_owner: "9999",
    group_modify_info_param_custom_info: [
        {
            group_info_custom_string_info_key: "test key",
            group_info_custom_string_info_value: "test  value",
        },
    ],
});
