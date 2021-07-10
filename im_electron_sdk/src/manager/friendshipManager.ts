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
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";
const ffi = require("ffi-napi");
const ref = require("ref-napi");

class FriendshipManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Buffer> = new Map();
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from(" ");
    private _callbacks: Map<String, Buffer> = new Map();
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
    ): Promise<Object> {
        const { user_data = " " } = getFriendProfileListParam;
        const c_user_data = this.stringFormator(user_data);
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipGetFriendProfileList", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(
                    this._callback.get(
                        "TIMFriendshipGetFriendProfileList"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMFriendshipAddFriend(addFriendParams: AddFriendParams): Promise<any> {
        const { params, user_data } = addFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipAddFriend", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddFriend(
                c_params,
                this._callback.get("TIMFriendshipAddFriend") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ): Promise<any> {
        const { params, user_data } = handleFriendAddParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipHandleFriendAddRequest", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipHandleFriendAddRequest(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipHandleFriendAddRequest"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ): Promise<any> {
        const { params, user_data } = modifyFriendProfileParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipModifyFriendProfile", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendProfile(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipModifyFriendProfile"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriend(
        deleteFriendParams: DeleteFriendParams
    ): Promise<any> {
        const { params, user_data } = deleteFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipDeleteFriend", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriend(
                c_params,
                this._callback.get("TIMFriendshipDeleteFriend") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCheckFriendType(
        checkFriendTypeParams: CheckFriendTypeParams
    ): Promise<any> {
        const { params, user_data } = checkFriendTypeParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipCheckFriendType", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipCheckFriendType(
                c_params,
                this._callback.get("TIMFriendshipCheckFriendType") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ): Promise<any> {
        const { params, user_data } = createFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipCreateFriendGroup", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipCreateFriendGroup(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipCreateFriendGroup"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipGetFriendGroupList", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendGroupList(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipGetFriendGroupList"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ): Promise<any> {
        const { params, user_data } = modifyFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipModifyFriendGroup", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendGroup(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipModifyFriendGroup"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipDeleteFriendGroup", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriendGroup(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipDeleteFriendGroup"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipAddToBlackList", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddToBlackList(
                c_params,
                this._callback.get("TIMFriendshipAddToBlackList") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetBlackList(
        getBlackListParams: GetBlackListParams
    ): Promise<any> {
        const { user_data } = getBlackListParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipGetBlackList", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetBlackList(
                this._callback.get("TIMFriendshipGetBlackList") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipDeleteFromBlackList", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFromBlackList(
                    c_params,
                    this._callback.get(
                        "TIMFriendshipDeleteFromBlackList"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ): Promise<any> {
        const { params, user_data } = friendshipGetPendencyListParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipGetPendencyList", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetPendencyList(
                c_params,
                this._callback.get("TIMFriendshipGetPendencyList") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeletePendency(
        deletePendencyParams: DeletePendencyParams
    ): Promise<any> {
        const { params, user_data } = deletePendencyParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipDeletePendency", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeletePendency(
                c_params,
                this._callback.get("TIMFriendshipDeletePendency") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ): Promise<any> {
        const { timestamp, user_data } = reportPendencyReadedParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipReportPendencyReaded", callback);
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipReportPendencyReaded(
                    timestamp,
                    this._callback.get(
                        "TIMFriendshipReportPendencyReaded"
                    ) as Buffer,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipSearchFriends(
        searchFriendsParams: SearchFriendsParams
    ): Promise<any> {
        const { params, user_data } = searchFriendsParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipSearchFriends", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipSearchFriends(
                c_params,
                this._callback.get("TIMFriendshipSearchFriends") as Buffer,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            this._callback.set("TIMFriendshipGetFriendsInfo", callback);
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendsInfo(
                c_params,
                this._callback.get("TIMFriendshipGetFriendsInfo") as Buffer,
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
