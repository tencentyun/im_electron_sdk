import {
    sdkconfig,
    libMethods,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    CommonCallbackFun,
    commonResponse,
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
    ErrorResponse,
    GroupTipsCallbackParams,
    GroupAttributeCallbackParams,
} from "../interface";
import {
    nodeStrigToCString,
    jsFuncToFFIFun,
    transformGroupTipFun,
    transformGroupAttributeFun,
} from "../utils/utils";

class GroupManager {
    private _imskdLib: libMethods;
    private _callbacks: Map<String, Buffer> = new Map();
    constructor(config: sdkconfig) {
        this._imskdLib = config.Imsdklib;
    }

    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from(" ");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || "",
        };
    }

    TIMGroupCreate(
        createGroupParams: CreateGroupParams
    ): Promise<commonResponse> {
        const { params, data } = createGroupParams;
        const paramsForCString = nodeStrigToCString(JSON.stringify(params));
        const userData = this.stringFormator(data);
        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupCreate(
                paramsForCString,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDelete(deleteParams: DeleteGroupParams): Promise<commonResponse> {
        const { groupId, data } = deleteParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDelete(
                groupID,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams): Promise<commonResponse> {
        const { groupId, helloMsg, data } = joinGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);
        const msg = this.stringFormator(helloMsg);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupJoin(
                groupID,
                msg,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams): Promise<commonResponse> {
        const { groupId, data } = quitGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupQuit(
                groupID,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupInviteMember(
        inviteMemberParams: InviteMemberParams
    ): Promise<commonResponse> {
        const { params, data } = inviteMemberParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupInviteMember(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDeleteMember(
        deleteMemberParams: DeleteMemberParams
    ): Promise<commonResponse> {
        const { params, data } = deleteMemberParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDeleteMember(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetJoinedGroupList(data?: string): Promise<commonResponse> {
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetJoinedGroupList(
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetGroupInfoList(
        getGroupListParams: GetGroupListParams
    ): Promise<commonResponse> {
        const { groupIds, data } = getGroupListParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetGroupInfoList(
                nodeStrigToCString(JSON.stringify(groupIds)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupModifyGroupInfo(
        modifyGroupParams: ModifyGroupParams
    ): Promise<commonResponse> {
        const { params, data } = modifyGroupParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupModifyGroupInfo(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetMemberInfoList(
        getGroupMemberInfoParams: GetGroupMemberInfoParams
    ): Promise<commonResponse> {
        const { params, data } = getGroupMemberInfoParams;

        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetMemberInfoList(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupModifyMemberInfo(
        modifyMemberInfoParams: ModifyMemberInfoParams
    ): Promise<commonResponse> {
        const { params, data } = modifyMemberInfoParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupModifyMemberInfo(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetPendencyList(
        getPendencyListParams: GetPendencyListParams
    ): Promise<commonResponse> {
        const { params, data } = getPendencyListParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetPendencyList(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const { timeStamp, data } = reportParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupReportPendencyReaded(
                timeStamp,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupHandlePendency(
        handlePendencyParams: HandlePendencyParams
    ): Promise<commonResponse> {
        const { params, data } = handlePendencyParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupHandlePendency(
                nodeStrigToCString(JSON.stringify(params)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetOnlineMemberCount(
        params: GetOnlineMemberCountParams
    ): Promise<commonResponse> {
        const { groupId, data } = params;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetOnlineMemberCount(
                nodeStrigToCString(groupId),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSearchGroups(
        searchGroupsParams: SearchGroupParams
    ): Promise<commonResponse> {
        const { searchParams, data } = searchGroupsParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSearchGroups(
                nodeStrigToCString(JSON.stringify(searchParams)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSearchGroupMembers(
        searchMemberParams: SearchMemberParams
    ): Promise<commonResponse> {
        const { searchParams, data } = searchMemberParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSearchGroupMembers(
                nodeStrigToCString(JSON.stringify(searchParams)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupInitGroupAttributes(
        initAttributesParams: InitGroupAttributeParams
    ): Promise<commonResponse> {
        const { groupId, attributes, data } = initAttributesParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupInitGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupSetGroupAttributes(
        params: InitGroupAttributeParams
    ): Promise<commonResponse> {
        const { groupId, attributes, data } = params;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupSetGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupDeleteGroupAttributes(
        params: DeleteAttributeParams
    ): Promise<commonResponse> {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(
            JSON.stringify(attributesKey)
        );

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupDeleteGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetGroupAttributes(
        params: DeleteAttributeParams
    ): Promise<commonResponse> {
        const { groupId, attributesKey, data } = params;
        const userData = this.stringFormator(data);
        const formatedGroupId = nodeStrigToCString(groupId);
        const formatedAttributesKey = nodeStrigToCString(
            JSON.stringify(attributesKey)
        );

        return new Promise((resolve, reject) => {
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) =>
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
            const code = this._imskdLib.TIMGroupGetGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                jsFuncToFFIFun(successCallback),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    async TIMSetGroupTipsEventCallback(
        params: GroupTipsCallbackParams
    ): Promise<any> {
        const { callback, data } = params;
        const userData = this.stringFormator(data);
        this._callbacks.set("TIMSetGroupTipsEventCallback", callback);

        this._imskdLib.TIMSetGroupTipsEventCallback(
            this._callbacks.get("TIMSetGroupTipsEventCallback") as Buffer,
            userData
        );
    }

    async TIMSetGroupAttributeChangedCallback(
        params: GroupAttributeCallbackParams
    ): Promise<any> {
        const { callback, data } = params;
        const userData = this.stringFormator(data);
        this._callbacks.set(
            "TIMSetGroupAttributeChangedCallback",
            transformGroupAttributeFun(callback)
        );
        this._imskdLib.TIMSetGroupAttributeChangedCallback(
            this._callbacks.get(
                "TIMSetGroupAttributeChangedCallback"
            ) as Buffer,
            userData
        );
    }
}
export default GroupManager;
