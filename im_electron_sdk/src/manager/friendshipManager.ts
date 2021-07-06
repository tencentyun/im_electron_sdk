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
    TIMOnAddFriendCallback,
    TIMOnDeleteFriendCallback,
    TIMUpdateFriendProfileCallback,
    TIMFriendAddRequestCallback,
    TIMFriendApplicationListDeletedCallback,
    TIMFriendApplicationListReadCallback,
    TIMFriendBlackListAddedCallback,
    TIMFriendBlackListDeletedCallback,
} from "../interface/friendshipInterface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";
const ffi = require("ffi-napi");
const ref = require("ref-napi");

class FriendshipManager {
    private _sdkconfig: sdkconfig;
    private stringFormator = (str: string | undefined): Buffer =>
        str ? nodeStrigToCString(str) : Buffer.from("");

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

    TIMFriendshipGetFriendProfileList(getFriendProfileListParam: GetFriendProfileListParams): Promise<Object> {
        const { user_data } = getFriendProfileListParam;
        const c_user_data = this.stringFormator(user_data);
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    
    TIMFriendshipAddFriend(addFriendParams: AddFriendParams): Promise<any> {
        const { params, user_data } = addFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddFriend(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    TIMFriendshipHandleFriendAddRequest(handleFriendAddParams: HandleFriendAddParams): Promise<any> {
        const { params, user_data } = handleFriendAddParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipHandleFriendAddRequest(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendProfile(modifyFriendProfileParams: ModifyFriendProfileParams): Promise<any> {
        const { params, user_data } = modifyFriendProfileParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendProfile(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriend(deleteFriendParams: DeleteFriendParams): Promise<any> {
        const { params, user_data } = deleteFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriend(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCheckFriendType(checkFriendTypeParams: CheckFriendTypeParams): Promise<any> {
        const { params, user_data } = checkFriendTypeParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipCheckFriendType(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipCreateFriendGroup(createFriendGroupParams: CreateFriendGroupParams): Promise<any> {
        const { params, user_data } = createFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipCreateFriendGroup(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendGroupList(friendshipStringArrayParams: FriendshipStringArrayParams): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipGetFriendGroupList(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipModifyFriendGroup(modifyFriendGroupParams: ModifyFriendGroupParams): Promise<any> {
        const { params, user_data } = modifyFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipModifyFriendGroup(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFriendGroup(friendshipStringArrayParams: FriendshipStringArrayParams): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFriendGroup(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipAddToBlackList(friendshipStringArrayParams: FriendshipStringArrayParams): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipAddToBlackList(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetBlackList(getBlackListParams: GetBlackListParams): Promise<any> {
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
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetBlackList(
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeleteFromBlackList(friendshipStringArrayParams: FriendshipStringArrayParams): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipDeleteFromBlackList(
                    c_params,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetPendencyList(friendshipGetPendencyListParams: FriendshipGetPendencyListParams): Promise<any> {
        const { params, user_data } = friendshipGetPendencyListParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetPendencyList(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipDeletePendency(deletePendencyParams: DeletePendencyParams): Promise<any> {
        const { params, user_data } = deletePendencyParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipDeletePendency(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipReportPendencyReaded(reportPendencyReadedParams: ReportPendencyReadedParams): Promise<any> {
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
            const code =
                this._sdkconfig.Imsdklib.TIMFriendshipReportPendencyReaded(
                    timestamp,
                    callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipSearchFriends(searchFriendsParams: SearchFriendsParams): Promise<any> {
        const { params, user_data } = searchFriendsParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipSearchFriends(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }
    TIMFriendshipGetFriendsInfo(friendshipStringArrayParams: FriendshipStringArrayParams): Promise<any> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(
            JSON.stringify(params)
        );

        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun(
                (code, desc, json_params, user_data) => {
                    if (code === 0)
                        resolve({ code, desc, json_params, user_data });
                    else reject(this.getErrorResponse({ code, desc }));
                }
            );
            const code = this._sdkconfig.Imsdklib.TIMFriendshipGetFriendsInfo(
                c_params,
                callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    // callback begin
    TIMSetOnAddFriendCallback(
        tIMOnAddFriendCallback: TIMOnAddFriendCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                tIMOnAddFriendCallback(
                    json_msg_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetOnAddFriendCallback(
            callback,
            c_user_data
        );
    }

    TIMSetOnDeleteFriendCallback(
        tIMOnDeleteFriendCallback: TIMOnDeleteFriendCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data: Buffer) {
                tIMOnDeleteFriendCallback(
                    json_identifier_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetOnDeleteFriendCallback(
            callback,
            c_user_data
        );
    }

    TIMSetUpdateFriendProfileCallback(
        tIMUpdateFriendProfileCallback: TIMUpdateFriendProfileCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_profile_update_array: Buffer,
                user_data: Buffer
            ) {
                tIMUpdateFriendProfileCallback(
                    json_friend_profile_update_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetUpdateFriendProfileCallback(
            callback,
            c_user_data
        );
    }

    TIMSetFriendAddRequestCallback(
        tIMFriendAddRequestCallback: TIMFriendAddRequestCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_add_request_pendency_array: Buffer,
                user_data: Buffer
            ) {
                tIMFriendAddRequestCallback(
                    json_friend_add_request_pendency_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetFriendAddRequestCallback(
            callback,
            c_user_data
        );
    }

    TIMSetFriendApplicationListDeletedCallback(
        tIMOnAddFriendCallback: TIMOnAddFriendCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_msg_array: Buffer, user_data: Buffer) {
                tIMOnAddFriendCallback(
                    json_msg_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListDeletedCallback(
            callback,
            c_user_data
        );
    }

    TIMSetFriendApplicationListReadCallback(
        tIMFriendApplicationListReadCallback: TIMFriendApplicationListReadCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (user_data: Buffer) {
                tIMFriendApplicationListReadCallback(user_data.toString());
            }
        );

        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListReadCallback(
            callback,
            c_user_data
        );
    }

    TIMSetFriendBlackListAddedCallback(
        tIMFriendBlackListAddedCallback: TIMFriendBlackListAddedCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (
                json_friend_black_added_array: Buffer,
                user_data: Buffer
            ) {
                tIMFriendBlackListAddedCallback(
                    json_friend_black_added_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetFriendBlackListAddedCallback(
            callback,
            c_user_data
        );
    }

    TIMSetFriendBlackListDeletedCallback(
        tIMFriendBlackListDeletedCallback: TIMFriendBlackListDeletedCallback,
        user_data: string
    ): void {
        const c_user_data = this.stringFormator(user_data);
        const callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            function (json_identifier_array: Buffer, user_data: Buffer) {
                tIMFriendBlackListDeletedCallback(
                    json_identifier_array.toString(),
                    user_data.toString()
                );
            }
        );

        this._sdkconfig.Imsdklib.TIMSetFriendBlackListDeletedCallback(
            callback,
            c_user_data
        );
    }
    // callback end
}
export default FriendshipManager;
