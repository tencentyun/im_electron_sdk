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
    CommonCallbackFuns,
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
    private _callback: Map<String, Function> = new Map();
    private _ffiCallback: Map<String, Buffer> = new Map();
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

    /**
    * @brief  获取好友列表
    *
    * @param GetFriendProfileListParams
    * @return Promise<commonResponse>
    *
    * @note 好友资料
    * 此接口通过回调返回所有好友资料[FriendProfile](../interfaces/interface_friendshipinterface.userprofile.html).
    * 
    * ```
    kTIMFriendProfileIdentifier          = "friend_profile_identifier";          // string,       只读, 好友UserID
    kTIMFriendProfileGroupNameArray      = "friend_profile_group_name_array";    // array string, 只读, 好友分组名称列表
    kTIMFriendProfileRemark              = "friend_profile_remark";              // string,       只读, 好友备注，最大96字节，获取自己资料时，该字段为空
    kTIMFriendProfileAddWording          = "friend_profile_add_wording";         // string,       只读, 好友申请时的添加理由
    kTIMFriendProfileAddSource           = "friend_profile_add_source";          // string,       只读, 好友申请时的添加来源
    kTIMFriendProfileAddTime             = "friend_profile_add_time";            // number,       只读, 好友添加时间
    kTIMFriendProfileUserProfile         = "friend_profile_user_profile";        // object [UserProfile](../../interfaces/interface_friendshipinterface.userprofile.html), 只读, 好友的个人资料
    kTIMFriendProfileCustomStringArray   = "friend_profile_custom_string_array"; // array [FriendProfileCustemStringInfo](), 只读, [自定义好友字段](https://cloud.tencent.com/document/product/269/1501#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.A5.BD.E5.8F.8B.E5.AD.97.E6.AE.B5)
    * ```
    */
    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParam: GetFriendProfileListParams
    ): Promise<commonResponse> {
        const { user_data = " " } = getFriendProfileListParam;
        const c_user_data = this.stringFormator(user_data);
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_params, user_data });
                } else {
                    reject(this.getErrorResponse({ code, desc }));
                }
                this._cache
                    .get("TIMFriendshipGetFriendProfileList")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipGetFriendProfileList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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

    /**
     * @brief 处理好友请求
     * @param AddFriendParams
     * @return {Promise<commonResponse>}
     * @note
     * 好友关系有单向和双向好友之分。详情请参考[添加好友](https://cloud.tencent.com/document/product/269/1501#.E6.B7.BB.E5.8A.A0.E5.A5.BD.E5.8F.8B).
     */
    TIMFriendshipAddFriend(
        addFriendParams: AddFriendParams
    ): Promise<commonResponse> {
        const { params, user_data } = addFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipAddFriend")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipAddFriend");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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

    /**
     * @brief 处理好友请求
     * @param HandleFriendAddParams
     * @return {Promise<commonResponse>}
     * @note &emsp;
     * 当自己的个人资料的加好友权限 kTIMUserProfileAddPermission 设置为 kTIMProfileAddPermission_NeedConfirm 时，别人添加自己为好友时会收到一个加好友的请求，可通过此接口处理加好友的请求。
     */
    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ): Promise<commonResponse> {
        const { params, user_data } = handleFriendAddParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMFriendshipHandleFriendAddRequest")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get(
                "TIMFriendshipHandleFriendAddRequest"
            );
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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

    /**
     * @brief 更新好友资料(备注等)
     * @param ModifyFriendProfileParams
     * @return {Promise<commonResponse>}
     * @note
     * 修改好友资料，目前支持修改的字段请参考FriendProfileItem（在interface里），一次可修改多个字段。修改自定义字段时填入的key值可以添加 Tag_SNS_Custom_ 前缀，也可以不添加 Tag_SNS_Custom_ 前缀，当不添加时，SDK内部会自动添加该前缀。
     */
    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ): Promise<commonResponse> {
        const { params, user_data } = modifyFriendProfileParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMFriendshipModifyFriendProfile")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipModifyFriendProfile");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 删除好友
     * @param deleteFriendParams
     * @return {Promise<commonResponse>}
     * @note
     * 删除好友也有删除单向好友还是双向好友之分，[删除好友](https://cloud.tencent.com/document/product/269/1501#.E5.88.A0.E9.99.A4.E5.A5.BD.E5.8F.8B).
     */
    TIMFriendshipDeleteFriend(
        deleteFriendParams: DeleteFriendParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = deleteFriendParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipDeleteFriend")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipDeleteFriend");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 检测好友类型(单向或双向)
     * @param CheckFriendTypeParams
     * @return {Promise<commonResponse>}
     * @note
     * 开发者可以通过此接口检测给定的 UserID 列表跟当前账户的好友关系，检测好友相关内容请参考 [检测好友](https://cloud.tencent.com/document/product/269/1501#.E6.A0.A1.E9.AA.8C.E5.A5.BD.E5.8F.8B)。
     */
    TIMFriendshipCheckFriendType(
        checkFriendTypeParams: CheckFriendTypeParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = checkFriendTypeParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipCheckFriendType")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipCheckFriendType");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 创建好友分组
     * @param CreateFriendGroupParams
     * @return {Promise<commonResponse>}
     * @note
     * 不能创建已存在的分组。
     */
    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = createFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipCreateFriendGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipCreateFriendGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 获取指定好友分组的分组信息
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipGetFriendGroupList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipGetFriendGroupList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 修改好友分组
     * @param ModifyFriendGroupParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = modifyFriendGroupParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipModifyFriendGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipModifyFriendGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 删除好友分组
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipDeleteFriendGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipDeleteFriendGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 添加指定用户到黑名单
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipAddToBlackList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipAddToBlackList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 获取黑名单列表
     * @param GetBlackListParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetBlackList(
        getBlackListParams: GetBlackListParams
    ): Promise<commonResponse> {
        const now = `${Date.now()}${randomString()}`;
        const { user_data } = getBlackListParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipGetBlackList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipGetBlackList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 从黑名单中删除指定用户列表
     * @param FriendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMFriendshipDeleteFromBlackList")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipDeleteFromBlackList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 获取好友添加请求未决信息列表
     * @param FriendshipGetPendencyListParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipGetPendencyListParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipGetPendencyList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipGetPendencyList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 上报好友添加请求未决信息已读
     * @param DeletePendencyParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeletePendency(
        deletePendencyParams: DeletePendencyParams
    ): Promise<commonResponse> {
        const { params, user_data } = deletePendencyParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipDeletePendency")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipDeletePendency");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 上报好友添加请求未决信息已读
     * @param ReportPendencyReadedParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ): Promise<commonResponse> {
        const { timestamp, user_data } = reportPendencyReadedParams;
        const c_user_data = this.stringFormator(user_data);

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMFriendshipReportPendencyReaded")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipReportPendencyReaded");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 搜索好友
     * @param SearchFriendsParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipSearchFriends(
        searchFriendsParams: SearchFriendsParams
    ): Promise<commonResponse> {
        const { params, user_data } = searchFriendsParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipSearchFriends")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipSearchFriends");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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
    /**
     * @brief 获取好友信息
     * @param FriendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResponse> {
        const { params, user_data } = friendshipStringArrayParams;
        const c_user_data = this.stringFormator(user_data);
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFuns = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0) resolve({ code, desc, json_params, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMFriendshipGetFriendsInfo")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMFriendshipGetFriendsInfo");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
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

    private onAddFriendCallback(json_msg_array: Buffer, user_data: Buffer) {
        const fn = this._callback.get("TIMSetOnAddFriendCallback");
        fn && fn(json_msg_array.toString(), user_data.toString());
    }
    private onDeleteFriendCallback(
        json_identifier_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetOnDeleteFriendCallback");
        fn && fn(json_identifier_array.toString(), user_data.toString());
    }
    private updateFriendProfileCallback(
        json_friend_profile_update_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetUpdateFriendProfileCallback");
        fn &&
            fn(
                json_friend_profile_update_array.toString(),
                user_data.toString()
            );
    }
    private friendAddRequestCallback(
        json_friend_add_request_pendency_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetFriendAddRequestCallback");
        fn &&
            fn(
                json_friend_add_request_pendency_array.toString(),
                user_data.toString()
            );
    }
    private friendApplicationListDeletedCallback(
        json_msg_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get(
            "TIMSetFriendApplicationListDeletedCallback"
        );
        fn && fn(json_msg_array.toString(), user_data.toString());
    }
    private friendApplicationListReadCallback(user_data: Buffer) {
        const fn = this._callback.get(
            "TIMSetFriendApplicationListReadCallback"
        );
        fn && fn(user_data.toString());
    }
    private friendBlackListAddedCallback(
        json_friend_black_added_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetFriendBlackListAddedCallback");
        fn &&
            fn(json_friend_black_added_array.toString(), user_data.toString());
    }
    private friendBlackListDeletedCallback(
        json_identifier_array: Buffer,
        user_data: Buffer
    ) {
        const fn = this._callback.get("TIMSetFriendBlackListDeletedCallback");
        fn && fn(json_identifier_array.toString(), user_data.toString());
    }
    /**
     * @brief 设置添加好友的回调
     * @param TIMOnAddFriendCallbackParams
     *
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备添加了好友，B设备ImSDK会收到添加好友的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetOnAddFriendCallback(params: TIMOnAddFriendCallbackParams): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        this._callback.set("TIMSetOnAddFriendCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.onAddFriendCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetOnAddFriendCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetOnAddFriendCallback(
            this._ffiCallback.get("TIMSetOnAddFriendCallback") as Buffer,
            c_user_data
        );
    }

    /**
     * @brief 设置好友的回调
     * @param  TIMOnDeleteFriendCallbackParams
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备添加了好友，B设备ImSDK会收到添加好友的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetOnDeleteFriendCallback(
        params: TIMOnDeleteFriendCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        this._callback.set("TIMSetOnDeleteFriendCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.onDeleteFriendCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetOnDeleteFriendCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetOnDeleteFriendCallback(
            this._ffiCallback.get("TIMSetOnDeleteFriendCallback") as Buffer,
            c_user_data
        );
    }

    /**
     * @brief 设置更新好友资料的回调
     * @param TIMUpdateFriendProfileCallbackParams
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备更新了好友资料，B设备ImSDK会收到更新好友资料的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetUpdateFriendProfileCallback(
        params: TIMUpdateFriendProfileCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);

        this._callback.set("TIMSetUpdateFriendProfileCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.updateFriendProfileCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetUpdateFriendProfileCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetUpdateFriendProfileCallback(
            this._ffiCallback.get(
                "TIMSetUpdateFriendProfileCallback"
            ) as Buffer,
            c_user_data
        );
    }

    /**
     * @brief  设置好友添加请求的回调
     * @param TIMFriendAddRequestCallbackParams 好友添加请求回调
     *
     * @note
     * 当前登入用户设置添加好友需要确认时，如果有用户请求加当前登入用户为好友，会收到好友添加请求的回调，ImSDK通过此回调告知开发者。如果多终端登入同一帐号，每个终端都会收到这个回调。
     */
    TIMSetFriendAddRequestCallback(
        params: TIMFriendAddRequestCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);

        this._callback.set("TIMSetFriendAddRequestCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.friendAddRequestCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetFriendAddRequestCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetFriendAddRequestCallback(
            this._ffiCallback.get("TIMSetFriendAddRequestCallback") as Buffer,
            c_user_data
        );
    }

    /**
     * @brief 设置好友申请删除的回调
     * @param TIMFriendApplicationListDeletedCallbackParams 好友申请删除回调
     *
     * @note
     *  1. 主动删除好友申请
     *  2. 拒绝好友申请
     *  3. 同意好友申请
     *  4. 申请加别人好友被拒绝
     */
    TIMSetFriendApplicationListDeletedCallback(
        params: TIMFriendApplicationListDeletedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);

        this._callback.set(
            "TIMSetFriendApplicationListDeletedCallback",
            callback
        );
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.friendApplicationListDeletedCallback.bind(this)
        );
        this._ffiCallback.set(
            "TIMSetFriendApplicationListDeletedCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListDeletedCallback(
            this._ffiCallback.get(
                "TIMSetFriendApplicationListDeletedCallback"
            ) as Buffer,
            c_user_data
        );
    }

    /**
     * @brief 设置好友申请已读的回调
     * @param TIMFriendApplicationListReadCallbackParams
     *
     * @note
     * 如果调用 setFriendApplicationRead 设置好友申请列表已读，会收到这个回调（主要用于多端同步）
     */
    TIMSetFriendApplicationListReadCallback(
        params: TIMFriendApplicationListReadCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);

        this._callback.set("TIMSetFriendApplicationListReadCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.friendApplicationListReadCallback.bind(this)
        );
        this._ffiCallback.set(
            "TIMSetFriendApplicationListReadCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetFriendApplicationListReadCallback(
            this._ffiCallback.get(
                "TIMSetFriendApplicationListDeletedCallback"
            ) as Buffer,
            c_user_data
        );
    }
    /**
     * @brief 设置黑名单新增的回调
     * @param TIMFriendBlackListAddedCallbackParams 黑名单新增的回调
     */
    TIMSetFriendBlackListAddedCallback(
        params: TIMFriendBlackListAddedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);

        this._callback.set("TIMSetFriendBlackListAddedCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.friendBlackListAddedCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetFriendBlackListAddedCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetFriendBlackListAddedCallback(
            this._ffiCallback.get(
                "TIMSetFriendBlackListAddedCallback"
            ) as Buffer,
            c_user_data
        );
    }

    /**
     * @brief 设置黑名单删除的回调
     * @param TIMFriendBlackListDeletedCallbackParams 黑名单新增的回调
     */
    TIMSetFriendBlackListDeletedCallback(
        params: TIMFriendBlackListDeletedCallbackParams
    ): void {
        const { callback, user_data = " " } = params;
        const c_user_data = this.stringFormator(user_data);
        this._callback.set("TIMSetFriendBlackListDeletedCallback", callback);
        const c_callback = ffi.Callback(
            ref.types.void,
            [ref.types.CString, ref.types.CString],
            this.friendBlackListDeletedCallback.bind(this)
        );
        this._ffiCallback.set(
            "TIMSetFriendBlackListDeletedCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetFriendBlackListDeletedCallback(
            this._ffiCallback.get(
                "TIMSetFriendBlackListDeletedCallback"
            ) as Buffer,
            c_user_data
        );
    }
    // callback end
}
export default FriendshipManager;
