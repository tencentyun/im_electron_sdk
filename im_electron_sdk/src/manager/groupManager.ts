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
    cache,
} from "../interface";
import {
    nodeStrigToCString,
    jsFuncToFFIFun,
    transformGroupTipFun,
    transformGroupAttributeFun,
    randomString,
} from "../utils/utils";

class GroupManager {
    private _imskdLib: libMethods;
    private _callback: Map<String, Buffer> = new Map();
    private _cache: Map<String, Map<string, cache>> = new Map();
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupCreate")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupCreate", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupCreate", cacheMap);
            const code = this._imskdLib.TIMGroupCreate(
                paramsForCString,
                this._callback.get("TIMGroupCreate") as Buffer,
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupDelete")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);

            this._callback.set("TIMGroupDelete", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDelete", cacheMap);
            const code = this._imskdLib.TIMGroupDelete(
                groupID,
                this._callback.get("TIMGroupDelete") as Buffer,
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupJoin")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupJoin", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupJoin", cacheMap);
            const code = this._imskdLib.TIMGroupJoin(
                groupID,
                msg,
                this._callback.get("TIMGroupJoin") as Buffer,
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupQuit")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupQuit", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupQuit", cacheMap);
            const code = this._imskdLib.TIMGroupQuit(
                groupID,
                this._callback.get("TIMGroupQuit"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupInviteMember")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupInviteMember", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupInviteMember", cacheMap);
            const code = this._imskdLib.TIMGroupInviteMember(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupInviteMember"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupDeleteMember")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupDeleteMember", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDeleteMember", cacheMap);
            const code = this._imskdLib.TIMGroupDeleteMember(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupDeleteMember"),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupGetJoinedGroupList(data?: string): Promise<commonResponse> {
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetJoinedGroupList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetJoinedGroupList", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetJoinedGroupList", cacheMap);
            const code = this._imskdLib.TIMGroupGetJoinedGroupList(
                this._callback.get("TIMGroupGetJoinedGroupList") as Buffer,
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetGroupInfoList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetGroupInfoList", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetGroupInfoList", cacheMap);
            const code = this._imskdLib.TIMGroupGetGroupInfoList(
                nodeStrigToCString(JSON.stringify(groupIds)),
                this._callback.get("TIMGroupGetGroupInfoList"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupModifyGroupInfo")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupModifyGroupInfo", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupModifyGroupInfo", cacheMap);
            const code = this._imskdLib.TIMGroupModifyGroupInfo(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupModifyGroupInfo"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetMemberInfoList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetMemberInfoList", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetMemberInfoList", cacheMap);
            const code = this._imskdLib.TIMGroupGetMemberInfoList(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupGetMemberInfoList"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupModifyMemberInfo")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupModifyMemberInfo", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupModifyMemberInfo", cacheMap);
            const code = this._imskdLib.TIMGroupModifyMemberInfo(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupModifyMemberInfo"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetPendencyList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetPendencyList", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetPendencyList", cacheMap);
            const code = this._imskdLib.TIMGroupGetPendencyList(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupGetPendencyList"),
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const { timeStamp, data } = reportParams;
        const userData = this.stringFormator(data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupReportPendencyReaded")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupReportPendencyReaded", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupReportPendencyReaded", cacheMap);
            const code = this._imskdLib.TIMGroupReportPendencyReaded(
                timeStamp,
                this._callback.get("TIMGroupReportPendencyReaded"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupHandlePendency")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupHandlePendency", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupHandlePendency", cacheMap);
            const code = this._imskdLib.TIMGroupHandlePendency(
                nodeStrigToCString(JSON.stringify(params)),
                this._callback.get("TIMGroupHandlePendency"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetOnlineMemberCount")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetOnlineMemberCount", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetOnlineMemberCount", cacheMap);
            const code = this._imskdLib.TIMGroupGetOnlineMemberCount(
                nodeStrigToCString(groupId),
                this._callback.get("TIMGroupGetOnlineMemberCount"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupSearchGroups")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupSearchGroups", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSearchGroups", cacheMap);
            const code = this._imskdLib.TIMGroupSearchGroups(
                nodeStrigToCString(JSON.stringify(searchParams)),
                this._callback.get("TIMGroupSearchGroups"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupSearchGroupMembers")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupSearchGroupMembers", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSearchGroupMembers", cacheMap);
            const code = this._imskdLib.TIMGroupSearchGroupMembers(
                nodeStrigToCString(JSON.stringify(searchParams)),
                this._callback.get("TIMGroupSearchGroupMembers"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupInitGroupAttributes")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupInitGroupAttributes", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupInitGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupInitGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                this._callback.get("TIMGroupInitGroupAttributes"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupSetGroupAttributes")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupSetGroupAttributes", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSetGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupSetGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                this._callback.get("TIMGroupSetGroupAttributes"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupDeleteGroupAttributes")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupDeleteGroupAttributes", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDeleteGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupDeleteGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                this._callback.get("TIMGroupDeleteGroupAttributes"),
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
            const now = `${Date.now()}${randomString()}`;
            const successCallback: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                code === 0
                    ? resolve({ code, desc, json_param, user_data })
                    : reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMGroupGetGroupAttributes")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            this._callback.set("TIMGroupGetGroupAttributes", callback);
            const cacheMap = new Map();
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupGetGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                this._callback.get("TIMGroupGetGroupAttributes"),
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
        this._callback.set(
            "TIMSetGroupTipsEventCallback",
            transformGroupTipFun(callback)
        );

        this._imskdLib.TIMSetGroupTipsEventCallback(
            this._callback.get("TIMSetGroupTipsEventCallback") as Buffer,
            userData
        );
    }

    async TIMSetGroupAttributeChangedCallback(
        params: GroupAttributeCallbackParams
    ): Promise<any> {
        const { callback, data } = params;
        const userData = this.stringFormator(data);
        this._callback.set(
            "TIMSetGroupAttributeChangedCallback",
            transformGroupAttributeFun(callback)
        );
        this._imskdLib.TIMSetGroupAttributeChangedCallback(
            this._callback.get("TIMSetGroupAttributeChangedCallback") as Buffer,
            userData
        );
    }
}
export default GroupManager;
