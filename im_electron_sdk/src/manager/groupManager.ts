import {
    sdkconfig,
    libMethods,
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    CommonCallbackFun,
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
    DeleteAttributeParams
} from "../interface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";

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

    if (groupParams.memberArray) {
        formatParamsWithCustomerInfo = {
            ...groupParams,
            ...formatParamsWithCustomerInfo,
            memberArray: formateMember(groupParams.memberArray, 'group_member_info_')
        }
    }

    return formatObject(formatParamsWithCustomerInfo ?? groupParams, 'create_group_param_group_');
}

class GroupManager {
    private _imskdLib: libMethods;

    constructor(config: sdkconfig) {
        this._imskdLib = config.Imsdklib;
    }

    private stringFormator = (str: string | undefined): Buffer => str ? nodeStrigToCString(str) : Buffer.from("");

    TIMGroupCreate(createGroupParams: CreateGroupParams): Promise<{}> {
        const { params, data } = createGroupParams;
        const formatedParams = formateGroupParams(params);
        const paramsForCString = nodeStrigToCString(JSON.stringify(formatedParams));
        const userData = this.stringFormator(data);
        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupCreate(paramsForCString, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupDelete(deleteParams: DeleteGroupParams): Promise<{}> {
        const { groupId, data } = deleteParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupDelete(groupID, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams): Promise<{}> {
        const { groupId, helloMsg, data } = joinGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);
        const msg = this.stringFormator(helloMsg);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupJoin(groupID, msg, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams): Promise<{}> {
        const { groupId, data } = quitGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupQuit(groupID, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupInviteMember(inviteMemberParams: InviteMemberParams): Promise<{}> {
        const { params, data } = inviteMemberParams;
        const formatedParams = formatObject(params, 'group_invite_member_param_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupInviteMember(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupDeleteMember(deleteMemberParams: DeleteMemberParams): Promise<{}> {
        const { params, data } = deleteMemberParams;
        const formatedParams = formatObject(params, 'group_delete_member_param_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupDeleteMember(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupGetJoinedGroupList(data?: string): Promise<{}> {
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetJoinedGroupList(jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupGetGroupInfoList(getGroupListParams: GetGroupListParams): Promise<{}> {
        const { groupIds, data } = getGroupListParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetGroupInfoList(nodeStrigToCString(JSON.stringify(groupIds)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupModifyGroupInfo(modifyGroupParams: ModifyGroupParams) {
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
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupModifyGroupInfo(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupGetMemberInfoList(getGroupMemberInfoParams: GetGroupMemberInfoParams) {
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
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetMemberInfoList(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupModifyMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams) {
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
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupModifyMemberInfo(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupGetPendencyList(getPendencyListParams: GetPendencyListParams) {
        const { params, data } = getPendencyListParams;
        const formatedParams = formatObject(params, 'group_pendency_option_');
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetPendencyList(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const {timeStamp, data } = reportParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupReportPendencyReaded(timeStamp, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupHandlePendency(handlePendencyParams: HandlePendencyParams) {
        const { params, data } = handlePendencyParams;
        let formateParamsWithPendency = {
            ...params,
            pendency: formatObject(params.pendency, 'group_pendency_')
        };

        const formatedParams = formatObject(formateParamsWithPendency, 'group_handle_pendency_param_');
        const userData = this.stringFormator(data);


        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupHandlePendency(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupGetOnlineMemberCount(params: GetOnlineMemberCountParams) {
        const { groupId, data } = params;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetOnlineMemberCount(nodeStrigToCString(groupId), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        }); 
    }

    TIMGroupSearchGroups(searchGroupsParams: SearchGroupParams ) {
        const { searchParams, data } = searchGroupsParams;
        const formatedParams = searchParams.map(member => formatObject(member, 'group_search_params_'));
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupSearchGroups(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        }); 

    }

    TIMGroupSearchGroupMembers(searchMemberParams: SearchMemberParams ) {
        const { searchParams, data } = searchMemberParams;
        const formatedParams = searchParams.map(member => formatObject(member, 'group_search_member_params_'));
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupSearchGroupMembers(nodeStrigToCString(JSON.stringify(formatedParams)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupInitGroupAttributes(initAttributesParams: InitGroupAttributeParams) {
        const { groupId, attributes, data } = initAttributesParams;
        const formatedAttribute = attributes.map(attribute => formatObject(attribute, 'group_atrribute_'));
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupInitGroupAttributes(nodeStrigToCString(groupId), nodeStrigToCString(JSON.stringify(formatedAttribute)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupSetGroupAttributes(params: InitGroupAttributeParams) {
        const { groupId, attributes, data } = params;
        const formatedAttribute = attributes.map(attribute => formatObject(attribute, 'group_atrribute_'));
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupSetGroupAttributes(nodeStrigToCString(groupId), nodeStrigToCString(JSON.stringify(formatedAttribute)), jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        });
    }

    TIMGroupDeleteGroupAttributes(params: DeleteAttributeParams) {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(JSON.stringify(attributesKey));

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupDeleteGroupAttributes(formatedGroupId, formatedAttributesKey, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        }); 
    }

    TIMGroupGetGroupAttributes(params: DeleteAttributeParams) {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(JSON.stringify(attributesKey));

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (code, desc, json, data) => resolve({ code, desc, json, data });
            const res = this._imskdLib.TIMGroupGetGroupAttributes(formatedGroupId, formatedAttributesKey, jsFuncToFFIFun(successCallback), userData);
            if (res !== 0) reject(`Error Code ${res}`);
        }); 
    }
}
export default GroupManager;