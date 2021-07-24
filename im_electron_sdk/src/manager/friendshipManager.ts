import {
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
    ErrorResponse,
    sdkconfig,
    cache,
    commonResponse,
} from "../interface";
import {
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
} from "../interface/friendshipInterface";
import {
    nodeStrigToCString,
    jsFuncToFFIFun,
    randomString,
} from "../utils/utils";
const ffi = require("ffi-napi");
const ref = require("ref-napi");

class FriendshipManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Buffer> = new Map();
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from(" ");
    private _cache: Map<String, Map<string, cache>> = new Map();
    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || "",
        };
    }

    getErrorResponseByCode(code: number) {
        return this.getErrorResponse({ code });
    }

    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }

    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParam: GetFriendProfileListParams
    ): Promise<commonResponse> {
        const { user_data = " " } = getFriendProfileListParam;
        const c_user_data = this.stringFormator(user_data);
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0) {
                        resolve({ code, desc, json_params, user_data });
                    } else {
                        reject(this.getErrorResponse({ code, desc }));
                    }
                    this._cache
                        .get("TIMFriendshipGetFriendProfileList")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipGetFriendProfileList", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(
                    this._cache
                        .get("TIMFriendshipGetFriendProfileList")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMFriendshipAddFriend(
        addFriendParams: AddFriendParams
    ): Promise<commonResponse> {
        const { params, user_data } = addFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipAddFriend")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipAddFriend", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddFriend(
                c_params,
                this._cache.get("TIMFriendshipAddFriend")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ): Promise<commonResponse> {
        const { params, user_data } = handleFriendAddParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipHandleFriendAddRequest")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipHandleFriendAddRequest", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipHandleFriendAddRequest(
                    c_params,
                    this._cache
                        .get("TIMFriendshipHandleFriendAddRequest")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ): Promise<commonResponse> {
        const { params, user_data } = modifyFriendProfileParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipModifyFriendProfile")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipModifyFriendProfile", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendProfile(
                    c_params,
                    this._cache
                        .get("TIMFriendshipModifyFriendProfile")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriend(
        deleteFriendParams: DeleteFriendParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = deleteFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipDeleteFriend")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipDeleteFriend", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriend(
                c_params,
                this._cache.get("TIMFriendshipDeleteFriend")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCheckFriendType(
        checkFriendTypeParams: CheckFriendTypeParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = checkFriendTypeParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipCheckFriendType")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipCheckFriendType", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipCheckFriendType(
                c_params,
                this._cache.get("TIMFriendshipCheckFriendType")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = createFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipCreateFriendGroup")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipCreateFriendGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipCreateFriendGroup(
                    c_params,
                    this._cache.get("TIMFriendshipCreateFriendGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipGetFriendGroupList")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipGetFriendGroupList", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendGroupList(
                    c_params,
                    this._cache.get("TIMFriendshipGetFriendGroupList")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = modifyFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipModifyFriendGroup")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipModifyFriendGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendGroup(
                    c_params,
                    this._cache.get("TIMFriendshipModifyFriendGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipDeleteFriendGroup")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipDeleteFriendGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriendGroup(
                    c_params,
                    this._cache.get("TIMFriendshipDeleteFriendGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipAddToBlackList")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipAddToBlackList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddToBlackList(
                c_params,
                this._cache.get("TIMFriendshipAddToBlackList")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetBlackList(
        getBlackListParams: GetBlackListParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { user_data } = getBlackListParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipGetBlackList")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipGetBlackList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetBlackList(
                this._cache.get("TIMFriendshipGetBlackList")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipDeleteFromBlackList")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipDeleteFromBlackList", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFromBlackList(
                    c_params,
                    this._cache
                        .get("TIMFriendshipDeleteFromBlackList")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipGetPendencyListParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipGetPendencyList")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipGetPendencyList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetPendencyList(
                c_params,
                this._cache.get("TIMFriendshipGetPendencyList")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeletePendency(
        deletePendencyParams: DeletePendencyParams
    ): Promise<commonResponse> {
        const { params, user_data } = deletePendencyParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipDeletePendency")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipDeletePendency", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeletePendency(
                c_params,
                this._cache.get("TIMFriendshipDeletePendency")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ): Promise<commonResponse> {
        const { timestamp, user_data } = reportPendencyReadedParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache
                        .get("TIMFriendshipReportPendencyReaded")
                        ?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipReportPendencyReaded", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipReportPendencyReaded(
                    timestamp,
                    this._cache
                        .get("TIMFriendshipReportPendencyReaded")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipSearchFriends(
        searchFriendsParams: SearchFriendsParams
    ): Promise<commonResponse> {
        const { params, user_data } = searchFriendsParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipSearchFriends")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipSearchFriends", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipSearchFriends(
                c_params,
                this._cache.get("TIMFriendshipSearchFriends")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                    this._cache.get("TIMFriendshipGetFriendsInfo")?.delete(now);
                }
            );
            const cacheMap = new Map();
            cacheMap.set(now, {
                callback: callback,
            });
            this._cache.set("TIMFriendshipGetFriendsInfo", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendsInfo(
                c_params,
                this._cache.get("TIMFriendshipGetFriendsInfo")?.get(now)
                    ?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    // callback begin
    TIMSetOnAddFriendCallback(params: TIMOnAddFriendCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                callback(json_msg_array.toString(), user_data.toString());
            }
        );
        this._callback.set("TIMSetOnAddFriendCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetOnAddFriendCallback(
            this._callback.get("TIMSetOnAddFriendCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetOnDeleteFriendCallback(
        params: TIMOnDeleteFriendCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data: Buffer) {
                callback(
                    json_identifier_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetOnDeleteFriendCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetOnDeleteFriendCallback(
            this._callback.get("TIMSetOnDeleteFriendCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetUpdateFriendProfileCallback(
        params: TIMUpdateFriendProfileCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_profile_update_array: Buffer,
                user_data: Buffer
            ) {
                callback(
                    json_friend_profile_update_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetUpdateFriendProfileCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetUpdateFriendProfileCallback(
            this._callback.get("TIMSetUpdateFriendProfileCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetFriendAddRequestCallback(
        params: TIMFriendAddRequestCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_add_request_pendency_array: Buffer,
                user_data: Buffer
            ) {
                callback(
                    json_friend_add_request_pendency_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetFriendAddRequestCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetFriendAddRequestCallback(
            this._callback.get("TIMSetFriendAddRequestCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetFriendApplicationListDeletedCallback(
        params: TIMFriendApplicationListDeletedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                callback(json_msg_array.toString(), user_data.toString());
            }
        );
        this._callback.set(
            "TIMSetFriendApplicationListDeletedCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListDeletedCallback(
            this._callback.get(
                "TIMSetFriendApplicationListDeletedCallback"
            ) as Buffer,
            c_user_data
        );
    }

    TIMSetFriendApplicationListReadCallback(
        params: TIMFriendApplicationListReadCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (user_data: Buffer) {
                callback(user_data.toString());
            }
        );
        this._callback.set(
            "TIMSetFriendApplicationListReadCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListReadCallback(
            this._callback.get(
                "TIMSetFriendApplicationListReadCallback"
            ) as Buffer,
            c_user_data
        );
    }

    TIMSetFriendBlackListAddedCallback(
        params: TIMFriendBlackListAddedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_black_added_array: Buffer,
                user_data: Buffer
            ) {
                callback(
                    json_friend_black_added_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetFriendBlackListAddedCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetFriendBlackListAddedCallback(
            this._callback.get("TIMSetFriendBlackListAddedCallback") as Buffer,
            c_user_data
        );
    }

    TIMSetFriendBlackListDeletedCallback(
        params: TIMFriendBlackListDeletedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data: Buffer) {
                callback(
                    json_identifier_array.toString(),
                    user_data.toString()
                );
            }
        );
        this._callback.set("TIMSetFriendBlackListDeletedCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetFriendBlackListDeletedCallback(
            this._callback.get(
                "TIMSetFriendBlackListDeletedCallback"
            ) as Buffer,
            c_user_data
        );
    }
    // callback end
}
export default FriendshipManager;
