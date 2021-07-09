type GroupInfoCustemString = {
    group_info_custom_string_info_key: string;
    group_info_custom_string_info_value: string;
};

type GroupMemberInfoCustemString = {
    group_member_info_custom_string_info_key: string;
    group_member_info_custom_string_info_value: string;
};

type GroupMemberInfo = {
    group_member_info_identifier: string;
    group_member_info_join_time?: number;
    group_member_info_member_role?: string;
    group_member_info_msg_flag?: number;
    group_member_info_msg_seq?: number;
    group_member_info_shutup_time?: number;
    group_member_info_name_card?: string;
    group_member_info_custom_info?: Array<GroupMemberInfoCustemString>;
};

interface GroupParams {
    create_group_param_group_name: string;
    create_group_param_group_id?: string;
    create_group_param_group_type?: number;
    create_group_param_group_member_array?: Array<GroupMemberInfo>;
    create_group_param_notification?: string;
    create_group_param_introduction?: string;
    create_group_param_face_url?: string;
    create_group_param_add_option?: number;
    create_group_param_max_member_num?: number;
    create_group_param_custom_info?: Array<GroupInfoCustemString>;
}

interface DeleteGroupParams {
    groupId: string;
    data?: string;
}

interface CreateGroupParams {
    params: GroupParams;
    data?: string;
}

interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    data?: string;
}

interface QuitGroupParams extends DeleteGroupParams {}

interface InviteMemberParams {
    params: {
        group_invite_member_param_group_id: string;
        group_invite_member_param_identifier_array: Array<string>;
        group_invite_member_param_user_data?: string;
    };
    data?: string;
}

interface DeleteMemberParams {
    params: {
        group_delete_member_param_group_id: string;
        group_delete_member_param_identifier_array: Array<string>;
        group_delete_member_param_user_data?: string;
    };
    data?: string;
}

interface GetGroupListParams {
    groupIds: Array<string>;
    data?: string;
}

interface ModifyGroupParams {
    params: {
        group_modify_info_param_group_id: string;
        group_modify_info_param_modify_flag: number;
        group_modify_info_param_group_name?: string;
        group_modify_info_param_notification?: string;
        group_modify_info_param_introduction?: string;
        group_modify_info_param_face_url?: string;
        group_modify_info_param_add_option?: number;
        group_modify_info_param_max_member_num?: number;
        group_modify_info_param_visible?: number;
        group_modify_info_param_searchable?: number;
        group_modify_info_param_is_shutup_all?: boolean;
        group_modify_info_param_owner?: string;
        group_modify_info_param_custom_info?: Array<GroupInfoCustemString>;
    };
    data?: string;
}

interface GetGroupMemberInfoParams {
    params: {
        group_get_members_info_list_param_group_id: string;
        group_get_members_info_list_param_identifier_array?: Array<string>;
        group_get_members_info_list_param_option?: {
            group_member_get_info_option_info_flag?: number;
            group_member_get_info_option_role_flag?: number;
            group_member_get_info_option_custom_array?: Array<string>;
        };
        group_get_members_info_list_param_next_seq?: number;
    };
    data?: string;
}

interface ModifyMemberInfoParams {
    params: {
        group_modify_member_info_group_id: string;
        group_modify_member_info_identifier: string;
        group_modify_member_info_modify_flag?: number;
        group_modify_member_info_msg_flag?: number;
        group_modify_member_info_member_role?: number;
        group_modify_member_info_shutup_time?: number;
        group_modify_member_info_name_card?: string;
        group_modify_member_info_custom_info?: Array<GroupMemberInfoCustemString>;
    };
    data?: string;
}

interface GetPendencyListParams {
    params: {
        group_pendency_option_start_time: number;
        group_pendency_option_max_limited: number;
    };
    data?: string;
}

interface ReportParams {
    timeStamp: number;
    data?: string;
}

interface HandlePendencyParams {
    params: {
        group_handle_pendency_param_is_accept?: boolean;
        group_handle_pendency_param_handle_msg?: string;
        group_handle_pendency_param_pendency: {
            group_pendency_group_id: string;
            group_pendency_form_identifier: string;
            group_pendency_add_time: number;
            group_pendency_to_identifier: string;
            group_pendency_pendency_type: number;
            group_pendency_handled: number;
            group_pendency_handle_result: number;
            group_pendency_apply_invite_msg: string;
            group_pendency_form_user_defined_data: string;
            group_pendency_approval_msg: string;
            group_pendency_to_user_defined_data: string;
            group_pendency_authentication: string;
            group_pendency_self_identifier: string;
            group_pendency_key: string;
        };
    };
    data?: string;
}

interface GetOnlineMemberCountParams {
    groupId: string;
    data?: string;
}

type GroupSearchParams = {
    group_search_params_keyword_list: Array<string>;
    group_search_params_field_list: Array<number>;
};

type MemberSearchParams = {
    group_search_member_params_groupid_list: Array<string>;
    group_search_member_params_keyword_list: Array<string>;
    group_search_member_params_field_list: Array<number>;
};

type GroupAttributes = {
    group_atrribute_key: string;
    group_atrribute_value: string;
};

interface SearchGroupParams {
    searchParams: GroupSearchParams;
    data?: string;
}

interface SearchMemberParams {
    searchParams: MemberSearchParams;
    data?: string;
}

interface InitGroupAttributeParams {
    groupId: string;
    attributes: Array<GroupAttributes>;
    data?: string;
}

interface DeleteAttributeParams {
    groupId: string;
    attributesKey: Array<string>;
    data?: string;
}
interface GroupTipsCallbackParams {
    callback: Buffer;
    data?: string;
}

interface GroupTipCallBackFun {
    (json_group_tip_array: string, user_data: string): void;
}

interface GroupAttributeCallbackParams {
    callback: GroupAttributeCallbackFun;
    data?: string;
}

interface GroupAttributeCallbackFun {
    (
        group_id: string,
        json_group_attibute_array: string,
        user_data: string
    ): void;
}

export {
    GroupMemberInfo,
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    InviteMemberParams,
    DeleteMemberParams,
    GetGroupListParams,
    ModifyGroupParams,
    GetGroupMemberInfoParams,
    ModifyMemberInfoParams,
    GetPendencyListParams,
    ReportParams,
    HandlePendencyParams,
    GetOnlineMemberCountParams,
    SearchGroupParams,
    SearchMemberParams,
    InitGroupAttributeParams,
    DeleteAttributeParams,
    GroupTipsCallbackParams,
    GroupTipCallBackFun,
    GroupAttributeCallbackParams,
    GroupAttributeCallbackFun,
};
