import {
    sdkconfig,
    libMethods,
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    CommonCallbackFun,
    commonResponse,
    InviteMemberParams,
    GroupMemberInfo,
    Pureobject,
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
    ErrorResponse,
    GroupTipsCallbackParams,
    GroupAttributeCallbackParams
} from "../interface";
import { nodeStrigToCString, jsFuncToFFIFun, transformGroupTipFun, transformGroupAttributeFun } from "../utils/utils";

const underLineTransform = (str: string): string => str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
const addPrefix = (prefix: string, key: string): string => `${prefix}${key}`;

type anyObj = {};


const formatObject = (obj: anyObj, prefix: string): anyObj =>
    Object.entries(obj).reduce((acctualResult, [key, value]) => {
        const formatedKey = addPrefix(prefix, underLineTransform(key));

        return {
            ...acctualResult,
            [formatedKey]: value
        }
    }, {});

const formateCustomInfo = (customInfoList: Array<Pureobject>, prefix: string): Array<anyObj> => customInfoList.map(info => formatObject(info, prefix));

const formateMember = (memberList: Array<GroupMemberInfo>, prefix: string) =>
    memberList.map(member => {
        let formatMemberWithCustomerInfo = null;
        if (member.customInfo) {
            formatMemberWithCustomerInfo = {
                ...member,
                customInfo: formateCustomInfo(member.customInfo, 'group_member_info_custom_string_info_')
            }
        }

        return formatObject(formatMemberWithCustomerInfo ?? member, prefix);
    });

const formateGroupParams = (groupParams: GroupParams) => {
    let formatParamsWithCustomerInfo = null;
    if (groupParams.customInfo) {
        formatParamsWithCustomerInfo = {
            ...groupParams,
            customInfo: formateCustomInfo(groupParams.customInfo, 'group_info_custom_string_info_')
        }
    };

    if (groupParams.groupMemberArray) {
        formatParamsWithCustomerInfo = {
            ...groupParams,
            ...formatParamsWithCustomerInfo,
            groupMemberArray: formateMember(groupParams.groupMemberArray, 'group_member_info_')
        }
    }

    return formatObject(formatParamsWithCustomerInfo ?? groupParams, 'create_group_param_');
}

class GroupManager {
    private _imskdLib: libMethods;

    constructor(config: sdkconfig) {
        this._imskdLib = config.Imsdklib;
    }

    private stringFormator = (str: string | undefined): Buffer => str ? nodeStrigToCString(str) : Buffer.from("");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_param: params.json_param || "",
            user_data: params.user_data || ""
        }
    }

    TIMGroupCreate(createGroupParams: CreateGroupParams): Promise<commonResponse> {
        const { params, data } = createGroupParams;
        const formatedParams = formateGroupParams(params);
        const paramsForCString = nodeStrigToCString(JSON.stringify(formatedParams));
        const userData = this.stringFormator(data);
        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupCreate(paramsForCString, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDelete(deleteParams: DeleteGroupParams): Promise<commonResponse> {
        const { groupId, data } = deleteParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDelete(groupID, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams): Promise<commonResponse> {
        const { groupId, helloMsg, data } = joinGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);
        const msg = this.stringFormator(helloMsg);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupJoin(groupID, msg, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams): Promise<commonResponse> {
        const { groupId, data } = quitGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupQuit(groupID, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupInviteMember(inviteMemberParams: InviteMemberParams): Promise<commonResponse> {
        const { params, data } = inviteMemberParams;
        const formatedParams = formatObject(params, 'group_invite_member_param_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupInviteMember(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDeleteMember(deleteMemberParams: DeleteMemberParams): Promise<commonResponse> {
        const { params, data } = deleteMemberParams;
        const formatedParams = formatObject(params, 'group_delete_member_param_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDeleteMember(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetJoinedGroupList(data?: string): Promise<commonResponse> {
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetJoinedGroupList(jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetGroupInfoList(getGroupListParams: GetGroupListParams): Promise<commonResponse> {
        const { groupIds, data } = getGroupListParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetGroupInfoList(nodeStrigToCString(JSON.stringify(groupIds)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupModifyGroupInfo(modifyGroupParams: ModifyGroupParams): Promise<commonResponse> {
        const { params, data } = modifyGroupParams;
        let formatParamsWithCustomerInfo = null;

        if (params.customInfo) {
            formatParamsWithCustomerInfo = {
                ...params,
                customInfo: formateCustomInfo(params.customInfo, 'group_info_custom_string_info_'),
            }
        }

        const formatedParams = formatObject(formatParamsWithCustomerInfo ?? params, 'group_modify_info_param_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupModifyGroupInfo(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetMemberInfoList(getGroupMemberInfoParams: GetGroupMemberInfoParams): Promise<commonResponse> {
        const { params, data } = getGroupMemberInfoParams;
        let formatedParamsWithOption = null;

        if (params.option) {
            formatedParamsWithOption = {
                ...params,
                option: formatObject(params.option, 'group_member_get_info_option_'),
            }
        }

        const userData = this.stringFormator(data);
        const formatedParams = formatObject(formatedParamsWithOption ?? params, 'group_get_members_info_list_param_');

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetMemberInfoList(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupModifyMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams): Promise<commonResponse> {
        const { params, data } = modifyMemberInfoParams;
        let formatParamsWithCustomerInfo = null;

        if (params.customInfo) {
            formatParamsWithCustomerInfo = {
                ...params,
                customInfo: formateCustomInfo(params.customInfo, 'group_member_info_custom_string_info_'),
            }
        }

        const formatedParams = formatObject(formatParamsWithCustomerInfo ?? params, 'group_modify_member_info_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupModifyMemberInfo(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetPendencyList(getPendencyListParams: GetPendencyListParams): Promise<commonResponse> {
        const { params, data } = getPendencyListParams;
        const formatedParams = formatObject(params, 'group_pendency_option_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetPendencyList(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const { timeStamp, data } = reportParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupReportPendencyReaded(timeStamp, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupHandlePendency(handlePendencyParams: HandlePendencyParams): Promise<commonResponse> {
        const { params, data } = handlePendencyParams;
        let formateParamsWithPendency = {
            ...params,
            pendency: formatObject(params.pendency, 'group_pendency_')
        };

        const formatedParams = formatObject(formateParamsWithPendency, 'group_handle_pendency_param_');
        const userData = this.stringFormator(data);


        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupHandlePendency(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetOnlineMemberCount(params: GetOnlineMemberCountParams): Promise<commonResponse> {
        const { groupId, data } = params;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetOnlineMemberCount(nodeStrigToCString(groupId), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSearchGroups(searchGroupsParams: SearchGroupParams): Promise<commonResponse> {
        const { searchParams, data } = searchGroupsParams;
        const formatedParams = formatObject(searchParams, 'group_search_params_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSearchGroups(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSearchGroupMembers(searchMemberParams: SearchMemberParams): Promise<commonResponse> {
        const { searchParams, data } = searchMemberParams;
        const formatedParams = formatObject(searchParams, 'group_search_member_params_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSearchGroupMembers(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupInitGroupAttributes(initAttributesParams: InitGroupAttributeParams): Promise<commonResponse> {
        const { groupId, attributes, data } = initAttributesParams;
        const formatedAttribute = attributes.map(attribute => formatObject(attribute, 'group_atrribute_'));
        const userData = this.stringFormator(data);
        
        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupInitGroupAttributes(nodeStrigToCString(groupId), nodeStrigToCString(JSON.stringify(formatedAttribute)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSetGroupAttributes(params: InitGroupAttributeParams): Promise<commonResponse> {
        const { groupId, attributes, data } = params;
        const formatedAttribute = attributes.map(attribute => formatObject(attribute, 'group_atrribute_'));
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSetGroupAttributes(nodeStrigToCString(groupId), nodeStrigToCString(JSON.stringify(formatedAttribute)), jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDeleteGroupAttributes(params: DeleteAttributeParams): Promise<commonResponse> {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(JSON.stringify(attributesKey));

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDeleteGroupAttributes(formatedGroupId, formatedAttributesKey, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetGroupAttributes(params: DeleteAttributeParams): Promise<commonResponse> {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(JSON.stringify(attributesKey));

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json_param, user_data) => code === 0 ? resolve({ code, desc, json_param, user_data }) : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetGroupAttributes(formatedGroupId, formatedAttributesKey, jsFuncToFFIFun(successCallback), userData);
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMSetGroupTipsEventCallback(params: GroupTipsCallbackParams): void {
        const { callback, data } =params;
        const userData = this.stringFormator(data);

        this._imskdLib.TIMSetGroupTipsEventCallback(transformGroupTipFun(callback), userData)
    }

    TIMSetGroupAttributeChangedCallback(params: GroupAttributeCallbackParams): void {
        const { callback, data } =params;
        const userData = this.stringFormator(data);

        this._imskdLib.TIMSetGroupAttributeChangedCallback(transformGroupAttributeFun(callback), userData)
    }
}
export default GroupManager;