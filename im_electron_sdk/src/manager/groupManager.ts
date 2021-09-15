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
import log from "../utils/log";
import {
    nodeStrigToCString,
    jsFuncToFFIFun,
    transformGroupTipFun,
    transformGroupAttributeFun,
    randomString,
} from "../utils/utils";

class GroupManager {
    private _imskdLib: libMethods;
    private _callback: Map<String, Function> = new Map();
    private _ffiCallback: Map<String, Buffer> = new Map();
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
            let cacheMap = this._cache.get("TIMGroupCreate");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupCreate", cacheMap);
            const code = this._imskdLib.TIMGroupCreate(
                paramsForCString,
                this._cache.get("TIMGroupCreate")?.get(now)?.callback,
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

            let cacheMap = this._cache.get("TIMGroupDelete");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDelete", cacheMap);
            const code = this._imskdLib.TIMGroupDelete(
                groupID,
                this._cache.get("TIMGroupDelete")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupJoin");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupJoin", cacheMap);
            const code = this._imskdLib.TIMGroupJoin(
                groupID,
                msg,
                this._cache.get("TIMGroupJoin")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupQuit");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupQuit", cacheMap);
            const code = this._imskdLib.TIMGroupQuit(
                groupID,
                this._cache.get("TIMGroupQuit")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupInviteMember");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupInviteMember", cacheMap);
            const code = this._imskdLib.TIMGroupInviteMember(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupInviteMember")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupDeleteMember");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDeleteMember", cacheMap);
            const code = this._imskdLib.TIMGroupDeleteMember(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupDeleteMember")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetJoinedGroupList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetJoinedGroupList", cacheMap);
            const code = this._imskdLib.TIMGroupGetJoinedGroupList(
                this._cache.get("TIMGroupGetJoinedGroupList")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetGroupInfoList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetGroupInfoList", cacheMap);
            const code = this._imskdLib.TIMGroupGetGroupInfoList(
                nodeStrigToCString(JSON.stringify(groupIds)),
                this._cache.get("TIMGroupGetGroupInfoList")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupModifyGroupInfo");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupModifyGroupInfo", cacheMap);
            const code = this._imskdLib.TIMGroupModifyGroupInfo(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupModifyGroupInfo")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetMemberInfoList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetMemberInfoList", cacheMap);
            const code = this._imskdLib.TIMGroupGetMemberInfoList(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupGetMemberInfoList")?.get(now)
                    ?.callback,
                userData
            );
            if (code !== 0)
                reject(this.getErrorResponse({ code, user_data: data }));
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
            let cacheMap = this._cache.get("TIMGroupModifyMemberInfo");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupModifyMemberInfo", cacheMap);
            const code = this._imskdLib.TIMGroupModifyMemberInfo(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupModifyMemberInfo")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetPendencyList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetPendencyList", cacheMap);
            const code = this._imskdLib.TIMGroupGetPendencyList(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupGetPendencyList")?.get(now)?.callback,
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }

    TIMGroupReportPendencyReaded(
        reportParams: ReportParams
    ): Promise<commonResponse> {
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
                log.info(`delete TIMGroupReportPendencyReaded Func ${now}`);
                this._cache.get("TIMGroupReportPendencyReaded")?.delete(now);
            };
            const callback = jsFuncToFFIFun(successCallback);
            let cacheMap = this._cache.get("TIMGroupReportPendencyReaded");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupReportPendencyReaded", cacheMap);
            log.info(`set TIMGroupReportPendencyReaded Func ${now}`);
            log.info(`TIMGroupReportPendencyReaded ${callback}`);
            const code = this._imskdLib.TIMGroupReportPendencyReaded(
                timeStamp,
                this._cache.get("TIMGroupReportPendencyReaded")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupHandlePendency");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupHandlePendency", cacheMap);
            const code = this._imskdLib.TIMGroupHandlePendency(
                nodeStrigToCString(JSON.stringify(params)),
                this._cache.get("TIMGroupHandlePendency")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetOnlineMemberCount");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetOnlineMemberCount", cacheMap);
            const code = this._imskdLib.TIMGroupGetOnlineMemberCount(
                nodeStrigToCString(groupId),
                this._cache.get("TIMGroupGetOnlineMemberCount")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupSearchGroups");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSearchGroups", cacheMap);
            const code = this._imskdLib.TIMGroupSearchGroups(
                nodeStrigToCString(JSON.stringify(searchParams)),
                this._cache.get("TIMGroupSearchGroups")?.get(now)?.callback,
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
            let cacheMap = this._cache.get("TIMGroupSearchGroupMembers");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSearchGroupMembers", cacheMap);
            const code = this._imskdLib.TIMGroupSearchGroupMembers(
                nodeStrigToCString(JSON.stringify(searchParams)),
                this._cache.get("TIMGroupSearchGroupMembers")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupInitGroupAttributes");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupInitGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupInitGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                this._cache.get("TIMGroupInitGroupAttributes")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupSetGroupAttributes");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupSetGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupSetGroupAttributes(
                nodeStrigToCString(groupId),
                nodeStrigToCString(JSON.stringify(attributes)),
                this._cache.get("TIMGroupSetGroupAttributes")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupDeleteGroupAttributes");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupDeleteGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupDeleteGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                this._cache.get("TIMGroupDeleteGroupAttributes")?.get(now)
                    ?.callback,
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
            let cacheMap = this._cache.get("TIMGroupGetGroupAttributes");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: successCallback,
                callback: callback,
            });
            this._cache.set("TIMGroupGetGroupAttributes", cacheMap);
            const code = this._imskdLib.TIMGroupGetGroupAttributes(
                formatedGroupId,
                formatedAttributesKey,
                this._cache.get("TIMGroupGetGroupAttributes")?.get(now)
                    ?.callback,
                userData
            );
            if (code !== 0) reject(this.getErrorResponse({ code }));
        });
    }
    private groupTipsEventCallback(
        json_group_tip_array: string,
        user_data: string
    ) {
        const fn = this._callback.get("TIMSetGroupTipsEventCallback");
        fn && fn(json_group_tip_array, user_data);
    }
    private groupAttributeChangedCallback(
        group_id: string,
        json_group_attibute_array: string,
        user_data: string
    ) {
        const fn = this._callback.get("TIMSetGroupAttributeChangedCallback");
        fn && fn(group_id, json_group_attibute_array, user_data);
    }
    async TIMSetGroupTipsEventCallback(
        params: GroupTipsCallbackParams
    ): Promise<any> {
        const { callback, data } = params;
        const userData = this.stringFormator(data);
        const c_callback = transformGroupTipFun(
            this.groupTipsEventCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetGroupTipsEventCallback", c_callback);
        this._callback.set("TIMSetGroupTipsEventCallback", callback);

        this._imskdLib.TIMSetGroupTipsEventCallback(
            this._ffiCallback.get("TIMSetGroupTipsEventCallback") as Buffer,
            userData
        );
    }

    async TIMSetGroupAttributeChangedCallback(
        params: GroupAttributeCallbackParams
    ): Promise<any> {
        const { callback, data } = params;
        const userData = this.stringFormator(data);
        const c_callback = transformGroupAttributeFun(
            this.groupAttributeChangedCallback.bind(this)
        );
        this._ffiCallback.set(
            "TIMSetGroupAttributeChangedCallback",
            c_callback
        );
        this._callback.set("TIMSetGroupAttributeChangedCallback", callback);
        this._imskdLib.TIMSetGroupAttributeChangedCallback(
            this._ffiCallback.get(
                "TIMSetGroupAttributeChangedCallback"
            ) as Buffer,
            userData
        );
    }
}
export default GroupManager;
